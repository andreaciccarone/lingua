import type { PersonKey, StemChange, TenseKey, VerbEntry } from '../../content/types'
import { PERSONS } from '../../content/types'

export type RuleTag =
  | 'regular'
  | 'irregularCell'
  | 'yoIrregular'
  | 'spellingChange'
  | 'pretStemChange'
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

  let ending = ES_ENDINGS[tense][es.class][PERSONS.indexOf(person)]

  if (tense === 'pret') {
    // -ir stem-changers shift the vowel in 3rd persons: pidió, durmieron
    if (es.class === 'ir' && es.stemChange && (person === '3sg' || person === '3pl')) {
      const to = es.stemChange.startsWith('o') ? 'u' : 'i'
      const from = es.stemChange[0]
      const i = stem.lastIndexOf(from)
      if (i !== -1) {
        stem = stem.slice(0, i) + to + stem.slice(i + 1)
        rules.push('pretStemChange')
      }
    }
    // yo spelling: buscar→busqué, llegar→llegué, empezar→empecé
    if (person === '1sg' && es.class === 'ar') {
      if (stem.endsWith('c')) {
        stem = stem.slice(0, -1) + 'qu'
        rules.push('spellingChange')
      } else if (stem.endsWith('g')) {
        stem += 'u'
        rules.push('spellingChange')
      } else if (stem.endsWith('z')) {
        stem = stem.slice(0, -1) + 'c'
        rules.push('spellingChange')
      }
    }
    // vowel stems turn ió/ieron into yó/yeron: leyó, creyeron
    if (es.class !== 'ar' && /[aeo]$/.test(stem) && (person === '3sg' || person === '3pl')) {
      ending = ending.replace('i', 'y')
      rules.push('spellingChange')
    }
  }

  if (rules.length === 0) rules.push('regular')
  return { form: stem + ending, appliedRules: rules }
}

/** reflexive pronoun for a person (me levanto, te levantas…) */
export const ES_REFLEXIVE: Record<PersonKey, string> = {
  '1sg': 'me',
  '2sg': 'te',
  '3sg': 'se',
  '1pl': 'nos',
  '2pl': 'os',
  '3pl': 'se',
}

/** Full paradigm for one tense — also renders the explanation tables. */
export function paradigmEs(verb: VerbEntry, tense: TenseKey): Record<PersonKey, string> {
  return Object.fromEntries(
    PERSONS.map((p) => [p, conjugateEs(verb, tense, p).form]),
  ) as Record<PersonKey, string>
}
