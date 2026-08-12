import type {
  DistractorStrategy,
  ExerciseInstance,
  ExerciseOption,
  LocText,
  PersonKey,
  PrimaryLang,
  SpanishVerbClass,
  TenseKey,
  VerbEntry,
} from '../content/types'
import { loc, PERSONS } from '../content/types'
import { conjugateEs, ES_ENDINGS, ES_REFLEXIVE, paradigmEs } from './conjugator/es'
import { glossVerb } from '../i18n/gloss-it'
import { tFor } from '../i18n/ui'

// ---------- seeded RNG: sessions are reproducible given (date, skill) ----------

export function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffled<T>(arr: readonly T[], rand: () => number): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

// ---------- Spanish subject pronouns ----------

const PRONOUNS: Record<PersonKey, string[]> = {
  '1sg': ['yo'],
  '2sg': ['tú'],
  '3sg': ['él', 'ella'],
  '1pl': ['nosotros', 'nosotras'],
  '2pl': ['vosotros', 'vosotras'],
  '3pl': ['ellos', 'ellas'],
}

// ---------- diagnostic distractors for conjugation ----------

interface Candidate {
  text: string
  strategy: DistractorStrategy
}

function conjugationCandidates(verb: VerbEntry, tense: TenseKey, person: PersonKey): Candidate[] {
  const es = verb.es
  if (!es) return []
  const out: Candidate[] = []

  // wrongPerson: valid forms of other persons — wrong given the pronoun in the prompt
  for (const p of PERSONS) {
    if (p === person) continue
    out.push({ text: conjugateEs(verb, tense, p).form, strategy: 'wrongPerson' })
  }

  // wrongClass: endings of the other conjugation classes on this stem.
  // Skipped for tiny stems (ir -> '', ver -> 'v'), which would yield bare endings.
  const stem = verb.lemma.slice(0, -2)
  if ((tense === 'pres' || tense === 'pret') && stem.length >= 2) {
    for (const cls of ['ar', 'er', 'ir'] as SpanishVerbClass[]) {
      if (cls === es.class) continue
      out.push({
        text: stem + ES_ENDINGS[tense][cls][PERSONS.indexOf(person)],
        strategy: 'wrongClass',
      })
    }
  }

  // stem-change corruptions
  if (es.stemChange && tense === 'pres') {
    const ending = ES_ENDINGS.pres[es.class][PERSONS.indexOf(person)]
    if (person === '1pl' || person === '2pl') {
      // overStemChange: apply the changed stem where it doesn't belong (*quieremos)
      const changedStem = conjugateEs(verb, 'pres', '2sg').form.slice(
        0,
        -ES_ENDINGS.pres[es.class][1].length,
      )
      out.push({ text: changedStem + ending, strategy: 'overStemChange' })
    } else {
      // missingStemChange: plain stem where the change is required (*quero)
      out.push({ text: stem + ending, strategy: 'missingStemChange' })
    }
  }

  out.push({ text: verb.lemma, strategy: 'infinitive' })
  return out
}

/**
 * Pick n distractors: unique, ≠ correct, strategy-diverse
 * (at most 2 per strategy so one failure mode can't fill the bank).
 */
export function pickDistractors(
  candidates: Candidate[],
  correct: string,
  n: number,
  rand: () => number,
): ExerciseOption[] {
  const seen = new Set([correct.toLowerCase()])
  const perStrategy = new Map<DistractorStrategy, number>()
  const out: ExerciseOption[] = []
  for (const c of shuffled(candidates, rand)) {
    if (out.length >= n) break
    const key = c.text.toLowerCase()
    if (seen.has(key)) continue
    if ((perStrategy.get(c.strategy) ?? 0) >= 2) continue
    seen.add(key)
    perStrategy.set(c.strategy, (perStrategy.get(c.strategy) ?? 0) + 1)
    out.push({ text: c.text, strategy: c.strategy })
  }
  return out
}

// ---------- generators ----------

export interface ConjugationDrillParams {
  verb: VerbEntry
  tense: TenseKey
  person: PersonKey
  topicId: string
  type: 'mc' | 'cloze'
  seed: string
  primary: PrimaryLang
}

export function genConjugationDrill(params: ConjugationDrillParams): ExerciseInstance {
  const { verb, tense, person, topicId, type, seed, primary } = params
  const rand = mulberry32(hashSeed(seed))
  const pronoun = pick(PRONOUNS[person], rand)
  const { form } = conjugateEs(verb, tense, person)
  const ending = ES_ENDINGS[tense === 'pret' ? 'pret' : 'pres'][verb.es!.class][
    PERSONS.indexOf(person)
  ]

  const refl = verb.es!.reflexive ? ES_REFLEXIVE[person] : null
  const displayLemma = verb.es!.reflexive ? `${verb.lemma}se` : verb.lemma
  const sentence = refl
    ? [capitalize(pronoun), refl, '___', `(${displayLemma})`]
    : [capitalize(pronoun), '___', `(${displayLemma})`]
  const gloss = glossVerb(verb, person, primary, tense)

  const base: ExerciseInstance = {
    type,
    lang: 'es',
    sentence,
    gapIndex: refl ? 2 : 1,
    gloss,
    answer: form,
    accepted: [form],
    skillIds: [`${topicId}:${person}`],
    ttsText: refl ? `${pronoun} ${refl} ${form}` : `${pronoun} ${form}`,
    strictSuffixLen: Math.min(ending.length, form.length - 1),
  }

  if (type === 'mc') {
    const distractors = pickDistractors(
      conjugationCandidates(verb, tense, person),
      form,
      3,
      rand,
    )
    base.options = shuffled([{ text: form }, ...distractors], rand)
  }
  return base
}

export interface MatchDrillParams {
  verb: VerbEntry
  tense: TenseKey
  topicId: string
  persons?: PersonKey[]
  seed: string
  primary: PrimaryLang
}

/** Pronoun ↔ conjugated-form matching, the paradigm warmup. */
export function genMatchDrill(params: MatchDrillParams): ExerciseInstance {
  const { verb, tense, topicId, seed, primary } = params
  const rand = mulberry32(hashSeed(seed))
  const paradigm = paradigmEs(verb, tense)
  // avoid ambiguous pairs: skip persons whose form duplicates another's
  const persons = (params.persons ?? shuffled(PERSONS, rand).slice(0, 5)).filter(
    (p, _, all) => !all.some((q) => q !== p && paradigm[q] === paradigm[p]),
  )
  const refl = verb.es?.reflexive
  const pairs: [string, string][] = persons.map((p) => [
    PRONOUNS[p][0],
    refl ? `${ES_REFLEXIVE[p]} ${paradigm[p]}` : paradigm[p],
  ])
  return {
    type: 'match',
    lang: 'es',
    sentence: [],
    gloss: tFor(primary)('matchPronounForm', { verb: refl ? `${verb.lemma}se` : verb.lemma }),
    answer: '',
    accepted: [],
    pairs,
    skillIds: persons.map((p) => `${topicId}:${p}`),
  }
}

export interface WordOrderItem {
  /** the canonical sentence, space-separated */
  answer: string
  /** other accepted orders (e.g. fronted variants) */
  also?: string[]
  gloss: LocText
  cellId: string
}

/** word-order tiles: rebuild the sentence from shuffled words */
export function genWordOrder(
  item: WordOrderItem,
  lang: 'es' | 'de',
  topicId: string,
  seed: string,
  primary: PrimaryLang,
): ExerciseInstance {
  const rand = mulberry32(hashSeed(seed))
  const tokens = item.answer.split(' ')
  return {
    type: 'tiles',
    lang,
    sentence: [],
    gloss: loc(item.gloss, primary),
    answer: item.answer,
    accepted: item.also ?? [],
    tiles: shuffled(tokens, rand),
    skillIds: [`${topicId}:${item.cellId}`],
    ttsText: item.answer,
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
