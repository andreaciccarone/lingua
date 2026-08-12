import type { PersonKey, TenseKey, VerbEntry } from '../../content/types'
import { PERSONS } from '../../content/types'

export interface ConjugatedFormDe {
  form: string
  /** separable prefix that moves to clause end: aufstehen -> { form: "stehe", prefix: "auf" } */
  prefix?: string
  appliedRules: string[]
}

/** regular present endings by person: ich/du/er/wir/ihr/sie */
const PRES_ENDINGS = ['e', 'st', 't', 'en', 't', 'en']

/** stems ending in t/d (and consonant+m/n clusters) insert an e before -st/-t */
function needsEInsertion(stem: string): boolean {
  if (/[td]$/.test(stem)) return true
  return /[^aeiouäöülrh][mn]$/.test(stem)
}

/** stems ending in an s-sound merge with the du -st ending: heißen -> heißt */
function hasSMerge(stem: string): boolean {
  return /(s|ß|x|z)$/.test(stem)
}

function stemOf(lemma: string, separablePrefix?: string): string {
  const base = separablePrefix ? lemma.slice(separablePrefix.length) : lemma
  // infinitives end in -en or -n (wandern, sammeln)
  return base.endsWith('en') ? base.slice(0, -2) : base.slice(0, -1)
}

/**
 * Conjugate a German verb in the present (or fetch stored perfect parts).
 * Resolution: irregular override cell -> du/er vowel change -> regular rules.
 */
export function conjugateDe(verb: VerbEntry, tense: TenseKey, person: PersonKey): ConjugatedFormDe {
  const de = verb.de
  if (!de) throw new Error(`${verb.id} has no German morphology`)
  if (tense !== 'pres') throw new Error(`German tense ${tense} not supported yet (perfect uses participle)`)

  const prefix = de.separablePrefix

  const override = de.irregular?.pres?.[person]
  if (override) return { form: override, prefix, appliedRules: ['irregularCell'] }

  if (de.vowelChange && (person === '2sg' || person === '3sg')) {
    return {
      form: person === '2sg' ? de.vowelChange.du : de.vowelChange.er,
      prefix,
      appliedRules: ['vowelChange'],
    }
  }

  const stem = stemOf(verb.lemma, prefix)
  let ending = PRES_ENDINGS[PERSONS.indexOf(person)]
  const rules: string[] = []

  if (needsEInsertion(stem) && (ending === 'st' || ending === 't')) {
    ending = 'e' + ending
    rules.push('eInsertion')
  } else if (hasSMerge(stem) && person === '2sg') {
    ending = 't' // -st loses its s after an s-sound
    rules.push('sMerge')
  }

  if (rules.length === 0) rules.push('regular')
  return { form: stem + ending, prefix, appliedRules: rules }
}

/** render "stehe … auf" for display, plain form otherwise */
export function displayFormDe(c: ConjugatedFormDe): string {
  return c.prefix ? `${c.form} … ${c.prefix}` : c.form
}

export function paradigmDe(verb: VerbEntry, tense: TenseKey): Record<PersonKey, string> {
  return Object.fromEntries(
    PERSONS.map((p) => [p, conjugateDe(verb, tense, p).form]),
  ) as Record<PersonKey, string>
}

/** perfect tense parts: conjugated aux + stored participle */
export function perfectDe(
  verb: VerbEntry,
  person: PersonKey,
  auxVerbs: { haben: VerbEntry; sein: VerbEntry },
): { aux: string; participle: string } {
  const de = verb.de
  if (!de) throw new Error(`${verb.id} has no German morphology`)
  const auxVerb = de.aux === 'sein' ? auxVerbs.sein : auxVerbs.haben
  return { aux: conjugateDe(auxVerb, 'pres', person).form, participle: de.participle }
}
