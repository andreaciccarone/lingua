import type { PersonKey, StemChange, TenseKey, VerbEntry } from '../../content/types'
import { PERSONS } from '../../content/types'

export type RuleTag =
  | 'regular'
  | 'irregularCell'
  | 'yoIrregular'
  | `stemChange:${StemChange}`

export interface ConjugatedForm {
  form: string
  appliedRules: RuleTag[]
}

export const ES_ENDINGS: Record<'pres' | 'pret', Record<'ar' | 'er' | 'ir', string[]>> = {
  pres: {
    ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
    er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
    ir: ['o', 'es', 'e', 'imos', 'ís', 'en'],
  },
  pret: {
    ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
    er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
  },
}

const STEM_VOWEL: Record<StemChange, { from: string; to: string }> = {
  'e>ie': { from: 'e', to: 'ie' },
  'o>ue': { from: 'o', to: 'ue' },
  'e>i': { from: 'e', to: 'i' },
  'u>ue': { from: 'u', to: 'ue' },
}

/** Persons whose stem changes in the present tense (all but nosotros/vosotros). */
const STEM_CHANGE_PERSONS: ReadonlySet<PersonKey> = new Set(['1sg', '2sg', '3sg', '3pl'])

function applyStemChange(stem: string, change: StemChange): string {
  const { from, to } = STEM_VOWEL[change]
  const i = stem.lastIndexOf(from)
  if (i === -1) return stem
  return stem.slice(0, i) + to + stem.slice(i + from.length)
}

/**
 * Conjugate a Spanish verb. Resolution order:
 * explicit irregular cell -> yo-irregular -> stem change -> regular paradigm.
 */
export function conjugateEs(verb: VerbEntry, tense: TenseKey, person: PersonKey): ConjugatedForm {
  const es = verb.es
  if (!es) throw new Error(`${verb.id} has no Spanish morphology`)
  if (tense !== 'pres' && tense !== 'pret') {
    throw new Error(`Spanish tense ${tense} not supported`)
  }

  const override = es.irregular?.[tense]?.[person]
  if (override) return { form: override, appliedRules: ['irregularCell'] }

  if (tense === 'pres' && person === '1sg' && es.yoIrregular) {
    return { form: es.yoIrregular, appliedRules: ['yoIrregular'] }
  }

  let stem = verb.lemma.slice(0, -2)
  const rules: RuleTag[] = []

  if (tense === 'pres' && es.stemChange && STEM_CHANGE_PERSONS.has(person)) {
    stem = applyStemChange(stem, es.stemChange)
    rules.push(`stemChange:${es.stemChange}`)
  }

  const ending = ES_ENDINGS[tense][es.class][PERSONS.indexOf(person)]
  if (rules.length === 0) rules.push('regular')
  return { form: stem + ending, appliedRules: rules }
}

/** Full paradigm for one tense — also renders the explanation tables. */
export function paradigmEs(verb: VerbEntry, tense: TenseKey): Record<PersonKey, string> {
  return Object.fromEntries(
    PERSONS.map((p) => [p, conjugateEs(verb, tense, p).form]),
  ) as Record<PersonKey, string>
}
