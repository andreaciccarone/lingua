import type { DistractorStrategy, ExerciseInstance } from '../content/types'
import { ES_VERB_BY_ID } from '../content/es/morphology/verbs'
import { ES_LEXEME_BY_KEY, ES_PACK_BASICS, packLexemes } from '../content/es/packs'
import { getCard, getDueCards, type CardRecord } from '../data/db'
import type { CardMeta } from '../data/progress'
import { todayLocal } from '../lib/dates'
import { genConjugationDrill, genMatchDrill } from './exercises'
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

// M3: hints and the topic->verb map live here; they move into Topic content at M4.
export const HINTS: Partial<Record<DistractorStrategy, string>> = {
  wrongPerson: 'The verb ending must match the person doing the action.',
  wrongClass: 'Check the verb class: -ar endings use a, -er/-ir use e/i.',
  infinitive: 'That is the unconjugated form. The verb must agree with its subject.',
  missingStemChange: 'This verb changes its stem vowel in this form.',
  overStemChange: 'nosotros and vosotros keep the original stem.',
  vocabConfusable: 'Careful — this word looks or sounds similar.',
}

const TOPIC_VERBS: Record<string, string> = {
  'es-ser-present': 'es/verb/ser',
  'es-present-ar': 'es/verb/hablar',
}

/** derive the card meta (lang/kind/source) from a skill id */
export function metaForSkill(skillId: string): CardMeta {
  if (skillId.includes('/vocab/')) {
    return { lang: skillId.startsWith('de') ? 'de' : 'es', kind: 'vocab', sourceId: 'es-pack-basics' }
  }
  return {
    lang: skillId.startsWith('de') ? 'de' : 'es',
    kind: 'skill',
    sourceId: skillId.split(':')[0],
  }
}

function reviewExerciseFor(card: CardRecord, seed: string): ExerciseInstance | null {
  if (card.kind === 'vocab') {
    // "es/vocab/casa:recog"
    const [path, side] = card.id.split(':')
    const lexeme = ES_LEXEME_BY_KEY.get(path.split('/').pop()!)
    if (!lexeme) return null
    return side === 'prod'
      ? genVocabProduction(lexeme, seed)
      : genVocabRecognition(lexeme, packLexemes(ES_PACK_BASICS), seed)
  }
  // "es-ser-present:2sg"
  const [topicId, cellId] = card.id.split(':')
  const verbId = TOPIC_VERBS[topicId]
  const verb = verbId ? ES_VERB_BY_ID.get(verbId) : undefined
  if (!verb || !/^[123](sg|pl)$/.test(cellId)) return null
  // recognition early, production once the skill has real intervals
  const type = card.srs.intervalDays >= 3 ? 'cloze' : 'mc'
  return genConjugationDrill({
    verb,
    tense: 'pres',
    person: cellId as '1sg',
    topicId,
    type,
    seed,
  })
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

function buildGrammarDemo(): SessionSpec {
  const ser = ES_VERB_BY_ID.get('es/verb/ser')!
  const hablar = ES_VERB_BY_ID.get('es/verb/hablar')!
  const day = todayLocal()
  const exercises: ExerciseInstance[] = [
    genMatchDrill({ verb: ser, tense: 'pres', topicId: 'es-ser-present', seed: `${day}/m1` }),
    ...(['2sg', '3sg', '1pl'] as const).map((p) =>
      genConjugationDrill({ verb: ser, tense: 'pres', person: p, topicId: 'es-ser-present', type: 'mc', seed: `${day}/ser/${p}` }),
    ),
    ...(['1sg', '3pl'] as const).map((p) =>
      genConjugationDrill({ verb: ser, tense: 'pres', person: p, topicId: 'es-ser-present', type: 'cloze', seed: `${day}/serc/${p}` }),
    ),
    genMatchDrill({ verb: hablar, tense: 'pres', topicId: 'es-present-ar', seed: `${day}/m2` }),
    ...(['3sg', '1pl'] as const).map((p) =>
      genConjugationDrill({ verb: hablar, tense: 'pres', person: p, topicId: 'es-present-ar', type: 'mc', seed: `${day}/hab/${p}` }),
    ),
    ...(['2sg', '3pl'] as const).map((p) =>
      genConjugationDrill({ verb: hablar, tense: 'pres', person: p, topicId: 'es-present-ar', type: 'cloze', seed: `${day}/habc/${p}` }),
    ),
  ]
  return {
    id: 'demo',
    title: 'Ser & -ar verbs',
    isReview: false,
    lessonId: 'es-demo/l1',
    exercises,
    hints: HINTS,
  }
}

async function buildVocabSession(): Promise<SessionSpec> {
  const day = todayLocal()
  const lexemes = packLexemes(ES_PACK_BASICS)

  // introduce up to 6 words that have never been seen (no card yet)
  const fresh = []
  for (const l of lexemes) {
    const lemmaKey = l.id.split('/').pop()!
    if (!(await getCard(`es/vocab/${lemmaKey}:recog`))) fresh.push(l)
    if (fresh.length >= 6) break
  }
  const pool = fresh.length >= 4 ? fresh : lexemes

  const exercises: ExerciseInstance[] = [
    ...fresh.map((l) => genFlashcard(l)),
    genVocabMatch(pool, `${day}/vm`),
    ...pool.slice(0, 4).map((l, i) => genVocabRecognition(l, lexemes, `${day}/vr/${i}`)),
    ...pool.slice(0, 3).map((l, i) => genVocabProduction(l, `${day}/vp/${i}`)),
  ]
  return {
    id: 'vocab-basics',
    title: ES_PACK_BASICS.title,
    isReview: false,
    lessonId: `${ES_PACK_BASICS.id}/l1`,
    exercises,
    hints: HINTS,
  }
}

export async function buildSession(id: string): Promise<SessionSpec | null> {
  if (id === 'demo') return buildGrammarDemo()
  if (id === 'vocab-basics') return buildVocabSession()
  if (id === 'review') return buildReviewSession()
  return null
}
