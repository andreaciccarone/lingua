import type {
  DistractorStrategy,
  DrillSpec,
  ExerciseInstance,
  Lang,
  LocText,
  PersonKey,
  PrimaryLang,
  Topic,
} from '../content/types'
import { loc } from '../content/types'
import {
  adjById,
  lexemeByKey,
  nounById,
  packById,
  packLexemes,
  packsFor,
  topicById,
  verbById,
} from '../content/registry'
import { getAllCards, getCard, getDueCards, getSettings, type CardRecord } from '../data/db'
import type { CardMeta } from '../data/progress'
import { todayLocal } from '../lib/dates'
import {
  genConjugationDrill,
  genMatchDrill,
  genWordOrder,
  hashSeed,
  mulberry32,
  shuffled,
} from './exercises'
import { genAdjAgreeDrill, genArticleDrill, genPluralDrill } from './exercises-es'
import {
  genCaseArticleDrill,
  genConjugationDrillDe,
  genMatchDrillDe,
  genPluralDrillDe,
} from './exercises-de'
import {
  genFlashcard,
  genVocabListening,
  genVocabMatch,
  genVocabProduction,
  genVocabRecognition,
} from './vocab'
import { hasVoice } from '../audio/tts'

export interface SessionSpec {
  id: string
  title: string
  isReview: boolean
  lessonId?: string
  exercises: ExerciseInstance[]
  /** resolved to the user's instruction language */
  hints: Partial<Record<DistractorStrategy, string>>
}

const REVIEW_SKILL_CAP = 30
const REVIEW_VOCAB_CAP = 40

export const HINTS: Partial<Record<DistractorStrategy, LocText>> = {
  wrongPerson: {
    en: 'The verb ending must match the person doing the action.',
    it: 'La desinenza del verbo deve concordare con chi compie l’azione.',
  },
  wrongClass: {
    en: 'Check the verb class: -ar endings use a, -er/-ir use e/i.',
    it: 'Controlla la coniugazione: i verbi in -ar usano la a, quelli in -er/-ir usano e/i.',
  },
  infinitive: {
    en: 'That is the unconjugated form. The verb must agree with its subject.',
    it: 'È la forma all’infinito. Il verbo va coniugato secondo il soggetto.',
  },
  missingStemChange: {
    en: 'This verb changes its stem vowel in this form.',
    it: 'Questo verbo cambia la vocale della radice in questa forma (dittongazione).',
  },
  overStemChange: {
    en: 'nosotros and vosotros keep the original stem.',
    it: 'nosotros e vosotros mantengono la radice originale.',
  },
  wrongGenderArticle: {
    en: 'Gender agreement: check the noun’s gender.',
    it: 'Concordanza di genere: controlla il genere del sostantivo.',
  },
  wrongNumber: {
    en: 'Check singular vs plural.',
    it: 'Controlla singolare e plurale.',
  },
  wrongCaseArticle: {
    en: 'Check the case: subject nominative, direct object accusative, dem/der/dem dative.',
    it: 'Controlla il caso: soggetto nominativo, complemento oggetto accusativo, dem/der/dem dativo.',
  },
  serEstarSwap: {
    en: 'Ser = what it is; estar = how or where it is.',
    it: 'Ser = che cosa è (identità); estar = come o dove si trova.',
  },
  nichtKeinSwap: {
    en: 'kein negates nouns; nicht negates everything else.',
    it: 'kein nega i sostantivi; nicht nega tutto il resto.',
  },
  missingVowelChange: {
    en: 'This verb changes its vowel for du and er/sie/es.',
    it: 'Questo verbo cambia vocale con du e er/sie/es.',
  },
  v2Violation: {
    en: 'The conjugated verb must be the second element of a statement.',
    it: 'Il verbo coniugato deve essere il secondo elemento della frase.',
  },
  vocabConfusable: {
    en: 'Careful — this word looks or sounds similar.',
    it: 'Attenzione — questa parola è simile ma diversa.',
  },
}

function locHints(
  maps: Partial<Record<DistractorStrategy, LocText>>[],
  primary: PrimaryLang,
): Partial<Record<DistractorStrategy, string>> {
  const out: Partial<Record<DistractorStrategy, string>> = {}
  for (const m of maps) {
    for (const [k, v] of Object.entries(m)) {
      out[k as DistractorStrategy] = loc(v, primary)
    }
  }
  return out
}

/** derive the card meta (lang/kind/source) from a skill id */
export function metaForSkill(skillId: string): CardMeta {
  const lang: Lang = skillId.startsWith('de') ? 'de' : 'es'
  if (skillId.includes('/vocab/')) {
    const key = skillId.split('/').pop()!.split(':')[0]
    const pack = packsFor(lang).find((p) => p.lexemeIds.some((id) => id.split('/').pop() === key))
    return { lang, kind: 'vocab', sourceId: pack?.id ?? `${lang}-vocab` }
  }
  return { lang, kind: 'skill', sourceId: skillId.split(':')[0] }
}

// ---------- drill expansion ----------

function expandDrill(
  spec: DrillSpec,
  topic: Topic,
  day: string,
  idx: number,
  primary: PrimaryLang,
): ExerciseInstance[] {
  const seed = (j: number | string) => `${day}/${topic.id}/${idx}/${j}`
  const de = topic.lang === 'de'
  switch (spec.gen) {
    case 'match-verb': {
      const verb = verbById(spec.verbId)
      if (!verb) return []
      return de
        ? [genMatchDrillDe({ verb, topicId: topic.id, seed: seed(0), primary })]
        : [genMatchDrill({ verb, tense: spec.tense, topicId: topic.id, seed: seed(0), primary })]
    }
    case 'conj': {
      const verb = verbById(spec.verbId)
      if (!verb) return []
      return spec.persons.map((person, j) =>
        de
          ? genConjugationDrillDe({
              verb,
              person,
              topicId: topic.id,
              type: spec.type,
              seed: seed(j),
              primary,
            })
          : genConjugationDrill({
              verb,
              tense: spec.tense,
              person,
              topicId: topic.id,
              type: spec.type,
              seed: seed(j),
              primary,
            }),
      )
    }
    case 'article': {
      const rand = mulberry32(hashSeed(seed('a')))
      return shuffled(
        spec.nounIds.map(nounById).filter((n) => !!n),
        rand,
      )
        .slice(0, spec.count)
        .map((noun, j) => {
          const number = spec.number === 'mix' ? (j % 2 === 0 ? 'sg' : 'pl') : spec.number
          return genArticleDrill(noun, {
            def: spec.def,
            number,
            topicId: topic.id,
            cellId: noun.es!.gender,
            seed: seed(j),
            primary,
          })
        })
    }
    case 'plural': {
      const rand = mulberry32(hashSeed(seed('p')))
      return shuffled(
        spec.nounIds.map(nounById).filter((n) => !!n),
        rand,
      )
        .slice(0, spec.count)
        .map((noun, j) =>
          de
            ? genPluralDrillDe(noun, { topicId: topic.id, cellId: 'pl-form', seed: seed(j), primary })
            : genPluralDrill(noun, { topicId: topic.id, cellId: 'pl-form', seed: seed(j), primary }),
        )
    }
    case 'adj-agree': {
      const rand = mulberry32(hashSeed(seed('adj')))
      return shuffled(spec.pairs, rand)
        .slice(0, spec.count)
        .map(([adjId, nounId], j) => {
          const adj = adjById(adjId)
          const noun = nounById(nounId)
          if (!adj || !noun) return null
          return genAdjAgreeDrill(adj, noun, {
            number: j % 2 === 0 ? 'sg' : 'pl',
            topicId: topic.id,
            seed: seed(j),
            primary,
          })
        })
        .filter((e): e is ExerciseInstance => !!e)
    }
    case 'case-article': {
      const rand = mulberry32(hashSeed(seed('c')))
      const nouns = shuffled(
        spec.nounIds.map(nounById).filter((n) => !!n),
        rand,
      ).slice(0, spec.count)
      return nouns.map((noun, j) =>
        genCaseArticleDrill(noun, {
          case: spec.case,
          det: spec.det,
          number: spec.number,
          topicId: topic.id,
          cellId: spec.cellId,
          frame: spec.frames[j % spec.frames.length],
          seed: seed(j),
          primary,
        }),
      )
    }
    case 'word-order':
      return spec.items.map((item, j) => genWordOrder(item, topic.lang, topic.id, seed(j), primary))
    case 'authored':
      // authored glosses are localizable; resolve them here
      return spec.exercises.map((e) => ({ ...e, gloss: loc(e.gloss, primary) }))
  }
}

function lexemeByFullId(lang: Lang, id: string) {
  return lexemeByKey(lang, id.split('/').pop()!)
}

export function buildTopicLesson(topicId: string, primary: PrimaryLang): SessionSpec | null {
  const topic = topicById(topicId)
  if (!topic) return null
  const day = todayLocal()
  const intro = topic.introLexemeIds
    .map((id) => lexemeByFullId(topic.lang, id))
    .filter((l) => !!l)
    .map((l) => genFlashcard(l, primary))
  const drills = topic.drillItems.flatMap((spec, idx) => expandDrill(spec, topic, day, idx, primary))
  return {
    id: `topic:${topicId}`,
    title: loc(topic.title, primary),
    isReview: false,
    lessonId: `${topicId}/l1`,
    exercises: [...intro, ...drills],
    hints: locHints([HINTS, topic.errorHints], primary),
  }
}

async function buildPackSession(packId: string): Promise<SessionSpec | null> {
  const pack = packById(packId)
  if (!pack) return null
  const day = todayLocal()
  const lexemes = packLexemes(pack)

  const fresh = []
  for (const l of lexemes) {
    const key = l.id.split('/').pop()!
    if (!(await getCard(`${pack.lang}/vocab/${key}:recog`))) fresh.push(l)
    if (fresh.length >= 7) break
  }
  const pool = fresh.length >= 4 ? fresh : lexemes

  const settings = await getSettings()
  const primary = settings.primary
  const listening = settings.listeningEnabled && (await hasVoice(pack.lang))

  const exercises: ExerciseInstance[] = [
    ...fresh.map((l) => genFlashcard(l, primary)),
    genVocabMatch(pool, `${day}/${packId}/vm`, primary),
    ...pool
      .slice(0, 4)
      .map((l, i) => genVocabRecognition(l, lexemes, `${day}/${packId}/vr/${i}`, primary)),
    ...(listening
      ? pool
          .slice(0, 2)
          .map((l, i) => genVocabListening(l, lexemes, `${day}/${packId}/vl/${i}`, primary))
      : []),
    ...pool
      .slice(0, 3)
      .map((l, i) => genVocabProduction(l, `${day}/${packId}/vp/${i}`, primary)),
  ]
  return {
    id: `pack:${packId}`,
    title: loc(pack.title, primary),
    isReview: false,
    lessonId: `${packId}/l1`,
    exercises,
    hints: locHints([HINTS], primary),
  }
}

// ---------- review generation: a due skill gets a freshly generated exercise ----------

function reviewExerciseForSkill(
  card: CardRecord,
  seed: string,
  primary: PrimaryLang,
): ExerciseInstance | null {
  const [topicId, cellId] = card.id.split(':')
  const topic = topicById(topicId)
  if (!topic || !cellId) return null
  const de = topic.lang === 'de'
  const rand = mulberry32(hashSeed(seed))

  // conjugation person cells
  if (/^[123](sg|pl)$/.test(cellId)) {
    const conjSpec = topic.drillItems.find((d) => d.gen === 'conj')
    if (!conjSpec || conjSpec.gen !== 'conj') return null
    const verb = verbById(conjSpec.verbId)
    if (!verb) return null
    const type = card.srs.intervalDays >= 3 ? 'cloze' : 'mc'
    const person = cellId as PersonKey
    return de
      ? genConjugationDrillDe({ verb, person, topicId, type, seed, primary })
      : genConjugationDrill({ verb, tense: conjSpec.tense, person, topicId, type, seed, primary })
  }

  // plural formation
  if (cellId === 'pl-form') {
    const spec = topic.drillItems.find((d) => d.gen === 'plural')
    if (!spec || spec.gen !== 'plural') return null
    const noun = nounById(shuffled(spec.nounIds, rand)[0])
    if (!noun) return null
    return de
      ? genPluralDrillDe(noun, { topicId, cellId, seed, primary })
      : genPluralDrill(noun, { topicId, cellId, seed, primary })
  }

  // German case-article cells (spec cellId matches the card cell)
  for (const spec of topic.drillItems) {
    if (spec.gen !== 'case-article' || spec.cellId !== cellId) continue
    const noun = nounById(shuffled(spec.nounIds, rand)[0])
    if (!noun) return null
    return genCaseArticleDrill(noun, {
      case: spec.case,
      det: spec.det,
      number: spec.number,
      topicId,
      cellId,
      frame: spec.frames[Math.floor(rand() * spec.frames.length)],
      seed,
      primary,
    })
  }

  // word-order cells
  for (const spec of topic.drillItems) {
    if (spec.gen !== 'word-order') continue
    const items = spec.items.filter((i) => i.cellId === cellId)
    const item = shuffled(items, rand)[0]
    if (item) return genWordOrder(item, topic.lang, topicId, seed, primary)
  }

  // Spanish adjective agreement cells: m / f / m.pl / f.pl
  if (topic.drillItems.some((d) => d.gen === 'adj-agree') && /^(m|f)(\.pl)?$/.test(cellId)) {
    const gender = cellId.startsWith('m') ? 'm' : 'f'
    const number = cellId.endsWith('.pl') ? 'pl' : 'sg'
    for (const spec of topic.drillItems) {
      if (spec.gen !== 'adj-agree') continue
      const candidates = spec.pairs.filter(([, nounId]) => nounById(nounId)?.es?.gender === gender)
      const pickPair = shuffled(candidates, rand)[0]
      if (pickPair) {
        const adj = adjById(pickPair[0])
        const noun = nounById(pickPair[1])
        if (adj && noun) return genAdjAgreeDrill(adj, noun, { number, topicId, seed, primary })
      }
    }
    return null
  }

  // Spanish article gender cells: m / f
  if (/^(m|f)$/.test(cellId)) {
    for (const spec of shuffled(topic.drillItems, rand)) {
      if (spec.gen !== 'article') continue
      const nouns = spec.nounIds.map(nounById).filter((n) => n?.es?.gender === cellId)
      const noun = shuffled(nouns, rand)[0]
      if (noun) {
        const number = spec.number === 'mix' ? (rand() < 0.5 ? 'sg' : 'pl') : spec.number
        return genArticleDrill(noun, { def: spec.def, number, topicId, cellId, seed, primary })
      }
    }
    return null
  }

  // anything else: replay an authored exercise targeting this skill
  for (const spec of topic.drillItems) {
    if (spec.gen !== 'authored') continue
    const match = shuffled(spec.exercises, rand).find((e) => e.skillIds.includes(card.id))
    if (match) return { ...match, gloss: loc(match.gloss, primary) }
  }
  return null
}

function reviewExerciseFor(
  card: CardRecord,
  seed: string,
  primary: PrimaryLang,
): ExerciseInstance | null {
  if (card.kind === 'vocab') {
    const [path, side] = card.id.split(':')
    const lang: Lang = path.startsWith('de') ? 'de' : 'es'
    const lexeme = lexemeByKey(lang, path.split('/').pop()!)
    if (!lexeme) return null
    const pool = packsFor(lang).flatMap((p) => packLexemes(p))
    return side === 'prod'
      ? genVocabProduction(lexeme, seed, primary)
      : genVocabRecognition(lexeme, pool, seed, primary)
  }
  return reviewExerciseForSkill(card, seed, primary)
}

async function buildReviewSession(): Promise<SessionSpec> {
  const today = todayLocal()
  const { activeLang, primary } = await getSettings()
  const due = await getDueCards(activeLang, today)
  const skills = due.filter((c) => c.kind === 'skill').slice(0, REVIEW_SKILL_CAP)
  const vocab = due.filter((c) => c.kind === 'vocab').slice(0, REVIEW_VOCAB_CAP)
  const exercises = [...skills, ...vocab]
    .map((c, i) => reviewExerciseFor(c, `${today}/rev/${c.id}/${i}`, primary))
    .filter((e): e is ExerciseInstance => !!e)
  return { id: 'review', title: 'Review', isReview: true, exercises, hints: locHints([HINTS], primary) }
}

/** ad-hoc drill of the weakest skills, entered from the Stats screen */
async function buildWeakSession(): Promise<SessionSpec> {
  const today = todayLocal()
  const { activeLang, primary } = await getSettings()
  const cards = await getAllCards(activeLang)
  const weak = cards
    .filter((c) => c.kind === 'skill' && c.srs.lapses > 0)
    .sort((a, b) => b.srs.lapses - a.srs.lapses || a.srs.ease - b.srs.ease)
    .slice(0, 8)
  const exercises = weak
    .map((c, i) => reviewExerciseFor(c, `${today}/weak/${c.id}/${i}`, primary))
    .filter((e): e is ExerciseInstance => !!e)
  return { id: 'weak', title: 'Weak skills', isReview: true, exercises, hints: locHints([HINTS], primary) }
}

export async function buildSession(id: string): Promise<SessionSpec | null> {
  if (id === 'review') return buildReviewSession()
  if (id === 'weak') return buildWeakSession()
  if (id.startsWith('topic:')) {
    const { primary } = await getSettings()
    return buildTopicLesson(id.slice('topic:'.length), primary)
  }
  if (id.startsWith('pack:')) return buildPackSession(id.slice('pack:'.length))
  return null
}
