import type {
  DistractorStrategy,
  DrillSpec,
  ExerciseInstance,
  PersonKey,
  Topic,
} from '../content/types'
import { ES_TOPIC_BY_ID } from '../content/es'
import { ES_VERB_BY_ID } from '../content/es/morphology/verbs'
import { ES_NOUN_BY_ID } from '../content/es/morphology/nouns'
import { ES_ADJ_BY_ID } from '../content/es/morphology/adjectives'
import { ES_LEXEME_BY_KEY, ES_PACKS, packLexemes } from '../content/es/packs'
import { getAllCards, getCard, getDueCards, type CardRecord } from '../data/db'
import type { CardMeta } from '../data/progress'
import { todayLocal } from '../lib/dates'
import { genConjugationDrill, genMatchDrill, hashSeed, mulberry32, shuffled } from './exercises'
import { genAdjAgreeDrill, genArticleDrill, genPluralDrill } from './exercises-es'
import { genFlashcard, genVocabMatch, genVocabProduction, genVocabRecognition } from './vocab'

export interface SessionSpec {
  id: string
  title: string
  isReview: boolean
  lessonId?: string
  exercises: ExerciseInstance[]
  hints: Partial<Record<DistractorStrategy, string>>
}

const REVIEW_SKILL_CAP = 30
const REVIEW_VOCAB_CAP = 40

export const HINTS: Partial<Record<DistractorStrategy, string>> = {
  wrongPerson: 'The verb ending must match the person doing the action.',
  wrongClass: 'Check the verb class: -ar endings use a, -er/-ir use e/i.',
  infinitive: 'That is the unconjugated form. The verb must agree with its subject.',
  missingStemChange: 'This verb changes its stem vowel in this form.',
  overStemChange: 'nosotros and vosotros keep the original stem.',
  wrongGenderArticle: 'Gender agreement: check whether the noun is el or la.',
  wrongNumber: 'Check singular vs plural.',
  serEstarSwap: 'Ser = what it is; estar = how or where it is.',
  vocabConfusable: 'Careful — this word looks or sounds similar.',
  v2Violation: 'Watch the word order.',
}

/** derive the card meta (lang/kind/source) from a skill id */
export function metaForSkill(skillId: string): CardMeta {
  if (skillId.includes('/vocab/')) {
    const key = skillId.split('/').pop()!.split(':')[0]
    const pack = ES_PACKS.find((p) => p.lexemeIds.some((id) => id.split('/').pop() === key))
    return {
      lang: skillId.startsWith('de') ? 'de' : 'es',
      kind: 'vocab',
      sourceId: pack?.id ?? 'es-vocab',
    }
  }
  return {
    lang: skillId.startsWith('de') ? 'de' : 'es',
    kind: 'skill',
    sourceId: skillId.split(':')[0],
  }
}

// ---------- drill expansion ----------

function expandDrill(spec: DrillSpec, topic: Topic, day: string, idx: number): ExerciseInstance[] {
  const seed = (j: number | string) => `${day}/${topic.id}/${idx}/${j}`
  switch (spec.gen) {
    case 'match-verb': {
      const verb = ES_VERB_BY_ID.get(spec.verbId)
      if (!verb) return []
      return [genMatchDrill({ verb, tense: spec.tense, topicId: topic.id, seed: seed(0) })]
    }
    case 'conj': {
      const verb = ES_VERB_BY_ID.get(spec.verbId)
      if (!verb) return []
      return spec.persons.map((person, j) =>
        genConjugationDrill({
          verb,
          tense: spec.tense,
          person,
          topicId: topic.id,
          type: spec.type,
          seed: seed(j),
        }),
      )
    }
    case 'article': {
      const rand = mulberry32(hashSeed(seed('a')))
      const nouns = shuffled(
        spec.nounIds.map((id) => ES_NOUN_BY_ID.get(id)).filter((n) => !!n),
        rand,
      ).slice(0, spec.count)
      return nouns.map((noun, j) => {
        const number = spec.number === 'mix' ? (j % 2 === 0 ? 'sg' : 'pl') : spec.number
        const cellId = topic.id === 'es-plural-articles' && number === 'pl' ? noun.es!.gender : noun.es!.gender
        return genArticleDrill(noun, { def: spec.def, number, topicId: topic.id, cellId, seed: seed(j) })
      })
    }
    case 'plural': {
      const rand = mulberry32(hashSeed(seed('p')))
      return shuffled(
        spec.nounIds.map((id) => ES_NOUN_BY_ID.get(id)).filter((n) => !!n),
        rand,
      )
        .slice(0, spec.count)
        .map((noun, j) => genPluralDrill(noun, { topicId: topic.id, cellId: 'pl-form', seed: seed(j) }))
    }
    case 'adj-agree': {
      const rand = mulberry32(hashSeed(seed('adj')))
      return shuffled(spec.pairs, rand)
        .slice(0, spec.count)
        .map(([adjId, nounId], j) => {
          const adj = ES_ADJ_BY_ID.get(adjId)
          const noun = ES_NOUN_BY_ID.get(nounId)
          if (!adj || !noun) return null
          return genAdjAgreeDrill(adj, noun, {
            number: j % 2 === 0 ? 'sg' : 'pl',
            topicId: topic.id,
            seed: seed(j),
          })
        })
        .filter((e): e is ExerciseInstance => !!e)
    }
    case 'authored':
      return spec.exercises
  }
}

function lexemeByFullId(id: string) {
  return ES_LEXEME_BY_KEY.get(id.split('/').pop()!)
}

export function buildTopicLesson(topicId: string): SessionSpec | null {
  const topic = ES_TOPIC_BY_ID.get(topicId)
  if (!topic) return null
  const day = todayLocal()
  const intro = topic.introLexemeIds
    .map(lexemeByFullId)
    .filter((l) => !!l)
    .map((l) => genFlashcard(l))
  const drills = topic.drillItems.flatMap((spec, idx) => expandDrill(spec, topic, day, idx))
  return {
    id: `topic:${topicId}`,
    title: topic.title,
    isReview: false,
    lessonId: `${topicId}/l1`,
    exercises: [...intro, ...drills],
    hints: { ...HINTS, ...topic.errorHints },
  }
}

async function buildPackSession(packId: string): Promise<SessionSpec | null> {
  const pack = ES_PACKS.find((p) => p.id === packId)
  if (!pack) return null
  const day = todayLocal()
  const lexemes = packLexemes(pack)

  const fresh = []
  for (const l of lexemes) {
    const key = l.id.split('/').pop()!
    if (!(await getCard(`es/vocab/${key}:recog`))) fresh.push(l)
    if (fresh.length >= 7) break
  }
  const pool = fresh.length >= 4 ? fresh : lexemes

  const exercises: ExerciseInstance[] = [
    ...fresh.map((l) => genFlashcard(l)),
    genVocabMatch(pool, `${day}/${packId}/vm`),
    ...pool.slice(0, 4).map((l, i) => genVocabRecognition(l, lexemes, `${day}/${packId}/vr/${i}`)),
    ...pool.slice(0, 3).map((l, i) => genVocabProduction(l, `${day}/${packId}/vp/${i}`)),
  ]
  return {
    id: `pack:${packId}`,
    title: pack.title,
    isReview: false,
    lessonId: `${packId}/l1`,
    exercises,
    hints: HINTS,
  }
}

// ---------- review generation: a due skill gets a freshly generated exercise ----------

function reviewExerciseForSkill(card: CardRecord, seed: string): ExerciseInstance | null {
  const [topicId, cellId] = card.id.split(':')
  const topic = ES_TOPIC_BY_ID.get(topicId)
  if (!topic || !cellId) return null

  // conjugation person cells
  if (/^[123](sg|pl)$/.test(cellId)) {
    const conjSpec = topic.drillItems.find((d) => d.gen === 'conj')
    if (!conjSpec || conjSpec.gen !== 'conj') return null
    const verb = ES_VERB_BY_ID.get(conjSpec.verbId)
    if (!verb) return null
    return genConjugationDrill({
      verb,
      tense: conjSpec.tense,
      person: cellId as PersonKey,
      topicId,
      type: card.srs.intervalDays >= 3 ? 'cloze' : 'mc',
      seed,
    })
  }

  // plural formation
  if (cellId === 'pl-form') {
    const spec = topic.drillItems.find((d) => d.gen === 'plural')
    if (!spec || spec.gen !== 'plural') return null
    const rand = mulberry32(hashSeed(seed))
    const noun = ES_NOUN_BY_ID.get(shuffled(spec.nounIds, rand)[0])
    return noun ? genPluralDrill(noun, { topicId, cellId, seed }) : null
  }

  // adjective agreement cells: m / f / m.pl / f.pl
  if (topic.drillItems.some((d) => d.gen === 'adj-agree') && /^(m|f)(\.pl)?$/.test(cellId)) {
    const gender = cellId.startsWith('m') ? 'm' : 'f'
    const number = cellId.endsWith('.pl') ? 'pl' : 'sg'
    const rand = mulberry32(hashSeed(seed))
    for (const spec of topic.drillItems) {
      if (spec.gen !== 'adj-agree') continue
      const candidates = spec.pairs.filter(
        ([, nounId]) => ES_NOUN_BY_ID.get(nounId)?.es?.gender === gender,
      )
      const pick = shuffled(candidates, rand)[0]
      if (pick) {
        const adj = ES_ADJ_BY_ID.get(pick[0])
        const noun = ES_NOUN_BY_ID.get(pick[1])
        if (adj && noun) return genAdjAgreeDrill(adj, noun, { number, topicId, seed })
      }
    }
    return null
  }

  // article gender cells: m / f
  if (/^(m|f)$/.test(cellId)) {
    const rand = mulberry32(hashSeed(seed))
    for (const spec of shuffled(topic.drillItems, rand)) {
      if (spec.gen !== 'article') continue
      const nouns = spec.nounIds
        .map((id) => ES_NOUN_BY_ID.get(id))
        .filter((n) => n?.es?.gender === cellId)
      const noun = shuffled(nouns, rand)[0]
      if (noun) {
        const number = spec.number === 'mix' ? (rand() < 0.5 ? 'sg' : 'pl') : spec.number
        return genArticleDrill(noun, { def: spec.def, number, topicId, cellId, seed })
      }
    }
    return null
  }

  // anything else: replay an authored exercise targeting this skill
  for (const spec of topic.drillItems) {
    if (spec.gen !== 'authored') continue
    const rand = mulberry32(hashSeed(seed))
    const match = shuffled(spec.exercises, rand).find((e) => e.skillIds.includes(card.id))
    if (match) return match
  }
  return null
}

function reviewExerciseFor(card: CardRecord, seed: string): ExerciseInstance | null {
  if (card.kind === 'vocab') {
    const [path, side] = card.id.split(':')
    const lexeme = ES_LEXEME_BY_KEY.get(path.split('/').pop()!)
    if (!lexeme) return null
    const pool = ES_PACKS.flatMap((p) => packLexemes(p))
    return side === 'prod' ? genVocabProduction(lexeme, seed) : genVocabRecognition(lexeme, pool, seed)
  }
  return reviewExerciseForSkill(card, seed)
}

async function buildReviewSession(): Promise<SessionSpec> {
  const today = todayLocal()
  const due = await getDueCards('es', today)
  const skills = due.filter((c) => c.kind === 'skill').slice(0, REVIEW_SKILL_CAP)
  const vocab = due.filter((c) => c.kind === 'vocab').slice(0, REVIEW_VOCAB_CAP)
  const exercises = [...skills, ...vocab]
    .map((c, i) => reviewExerciseFor(c, `${today}/rev/${c.id}/${i}`))
    .filter((e): e is ExerciseInstance => !!e)
  return { id: 'review', title: 'Review', isReview: true, exercises, hints: HINTS }
}

/** ad-hoc drill of the weakest skills, entered from the Stats screen */
async function buildWeakSession(): Promise<SessionSpec> {
  const today = todayLocal()
  const cards = await getAllCards('es')
  const weak = cards
    .filter((c) => c.kind === 'skill' && c.srs.lapses > 0)
    .sort((a, b) => b.srs.lapses - a.srs.lapses || a.srs.ease - b.srs.ease)
    .slice(0, 8)
  const exercises = weak
    .map((c, i) => reviewExerciseFor(c, `${today}/weak/${c.id}/${i}`))
    .filter((e): e is ExerciseInstance => !!e)
  return { id: 'weak', title: 'Weak skills', isReview: true, exercises, hints: HINTS }
}

export async function buildSession(id: string): Promise<SessionSpec | null> {
  if (id === 'review') return buildReviewSession()
  if (id === 'weak') return buildWeakSession()
  if (id.startsWith('topic:')) return buildTopicLesson(id.slice('topic:'.length))
  if (id.startsWith('pack:')) return buildPackSession(id.slice('pack:'.length))
  return null
}
