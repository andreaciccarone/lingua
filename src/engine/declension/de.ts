import type { GermanCase, GermanGender, NounEntry, PersonKey } from '../../content/types'

export type DeNumber = 'sg' | 'pl'
type Det = 'def' | 'indef' | 'kein' | 'poss'

/** definite articles: case × (m, f, n, pl) */
const DEF: Record<GermanCase, [string, string, string, string]> = {
  nom: ['der', 'die', 'das', 'die'],
  acc: ['den', 'die', 'das', 'die'],
  dat: ['dem', 'der', 'dem', 'den'],
}

/** ein-word ENDINGS: case × (m, f, n, pl) — applied to ein/kein/mein/dein/… */
const EIN_ENDINGS: Record<GermanCase, [string, string, string, string]> = {
  nom: ['', 'e', '', 'e'],
  acc: ['en', 'e', '', 'e'],
  dat: ['em', 'er', 'em', 'en'],
}

const POSS_STEM: Record<PersonKey, string> = {
  '1sg': 'mein',
  '2sg': 'dein',
  '3sg': 'sein', // sein/ihr resolved by possessor gender; default masculine/neuter possessor
  '1pl': 'unser',
  '2pl': 'euer', // note: euer drops the inner e when it takes an ending -> eur+e
  '3pl': 'ihr',
}

function slot(gender: GermanGender, number: DeNumber): 0 | 1 | 2 | 3 {
  if (number === 'pl') return 3
  return gender === 'm' ? 0 : gender === 'f' ? 1 : 2
}

export interface DeclineOptions {
  case: GermanCase
  det: Det
  number: DeNumber
  possessor?: PersonKey
  /** feminine possessor for 3sg (ihr instead of sein) */
  possessorFeminine?: boolean
}

export interface DeclinedNP {
  article: string
  noun: string
}

export function declineDe(noun: NounEntry, opts: DeclineOptions): DeclinedNP {
  const de = noun.de
  if (!de) throw new Error(`${noun.id} has no German morphology`)
  const s = slot(de.gender, opts.number)

  let article: string
  if (opts.det === 'def') {
    article = DEF[opts.case][s]
  } else {
    let stem: string
    if (opts.det === 'indef') {
      if (opts.number === 'pl') throw new Error('ein has no plural')
      stem = 'ein'
    } else if (opts.det === 'kein') {
      stem = 'kein'
    } else {
      const p = opts.possessor ?? '1sg'
      stem = p === '3sg' && opts.possessorFeminine ? 'ihr' : POSS_STEM[p]
    }
    const ending = EIN_ENDINGS[opts.case][s]
    if (stem === 'euer' && ending) stem = 'eur'
    article = stem + ending
  }

  let nounForm = opts.number === 'pl' ? de.plural : noun.lemma
  // n-declension: weak masculine nouns take -(e)n outside the nominative singular
  if (de.nDeclension && opts.number === 'sg' && opts.case !== 'nom') {
    nounForm = noun.lemma + (noun.lemma.endsWith('e') ? 'n' : 'en')
  }
  // dative plural: noun takes -n unless it already ends in -n or -s
  if (opts.case === 'dat' && opts.number === 'pl' && !/[ns]$/.test(nounForm)) {
    nounForm += 'n'
  }
  return { article, noun: nounForm }
}


// ---------- attributive adjective endings ----------

/** weak endings (after der-words): case × (m, f, n, pl) */
const ADJ_WEAK: Record<GermanCase, [string, string, string, string]> = {
  nom: ['e', 'e', 'e', 'en'],
  acc: ['en', 'e', 'e', 'en'],
  dat: ['en', 'en', 'en', 'en'],
}

/** mixed endings (after ein-words: ein/kein/mein…) */
const ADJ_MIXED: Record<GermanCase, [string, string, string, string]> = {
  nom: ['er', 'e', 'es', 'en'],
  acc: ['en', 'e', 'es', 'en'],
  dat: ['en', 'en', 'en', 'en'],
}

/** strong endings (no determiner) — the adjective carries the case itself */
const ADJ_STRONG: Record<GermanCase, [string, string, string, string]> = {
  nom: ['er', 'e', 'es', 'e'],
  acc: ['en', 'e', 'es', 'e'],
  dat: ['em', 'er', 'em', 'en'],
}

export interface AdjEndingOptions {
  case: GermanCase
  gender: GermanGender
  number: DeNumber
  det: 'def' | 'indef' | 'kein' | 'poss' | 'none'
}

/** ending only ('er' in "ein guter Mann"); caller appends to the adjective stem */
export function adjEndingDe(opts: AdjEndingOptions): string {
  const s = slot(opts.gender, opts.number)
  if (opts.det === 'def') return ADJ_WEAK[opts.case][s]
  if (opts.det === 'none') return ADJ_STRONG[opts.case][s]
  return ADJ_MIXED[opts.case][s]
}
