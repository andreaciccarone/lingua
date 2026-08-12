import type { AdjEntry, NounEntry, PersonKey, PrimaryLang, VerbEntry } from '../content/types'
import { PERSONS } from '../content/types'

/** Italian glossing for GENERATED exercises: "lui parla", "la casa bianca", "delle case".
 *  Content-authored text is translated in the content files; this handles the formulas. */

export const IT_PRONOUNS: Record<PersonKey, string> = {
  '1sg': 'io',
  '2sg': 'tu',
  '3sg': 'lui/lei',
  '1pl': 'noi',
  '2pl': 'voi',
  '3pl': 'loro',
}

const EN_PRONOUNS: Record<PersonKey, string> = {
  '1sg': 'I',
  '2sg': 'you',
  '3sg': 'he/she',
  '1pl': 'we',
  '2pl': 'you all',
  '3pl': 'they',
}

const EN_BE: Record<PersonKey, string> = {
  '1sg': 'am',
  '2sg': 'are',
  '3sg': 'is',
  '1pl': 'are',
  '2pl': 'are',
  '3pl': 'are',
}

/** irregular Italian presents for verbs that appear as glosses */
const IT_IRREGULAR: Record<string, string[]> = {
  essere: ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'],
  avere: ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'],
  andare: ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno'],
  fare: ['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno'],
  bere: ['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono'],
  potere: ['posso', 'puoi', 'può', 'possiamo', 'potete', 'possono'],
  volere: ['voglio', 'vuoi', 'vuole', 'vogliamo', 'volete', 'vogliono'],
  sapere: ['so', 'sai', 'sa', 'sappiamo', 'sapete', 'sanno'],
  venire: ['vengo', 'vieni', 'viene', 'veniamo', 'venite', 'vengono'],
  dare: ['do', 'dai', 'dà', 'diamo', 'date', 'danno'],
  stare: ['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno'],
  uscire: ['esco', 'esci', 'esce', 'usciamo', 'uscite', 'escono'],
  dire: ['dico', 'dici', 'dice', 'diciamo', 'dite', 'dicono'],
}

const IT_ENDINGS: Record<'are' | 'ere' | 'ire', string[]> = {
  are: ['o', 'i', 'a', 'iamo', 'ate', 'ano'],
  ere: ['o', 'i', 'e', 'iamo', 'ete', 'ono'],
  ire: ['o', 'i', 'e', 'iamo', 'ite', 'ono'],
}

/** conjugate an Italian gloss verb in the present (regular rules + overrides) */
export function conjugateIt(infinitive: string, person: PersonKey): string {
  const idx = PERSONS.indexOf(person)
  const irregular = IT_IRREGULAR[infinitive]
  if (irregular) return irregular[idx]

  const cls = infinitive.slice(-3) as 'are' | 'ere' | 'ire'
  if (!IT_ENDINGS[cls]) return infinitive
  let stem = infinitive.slice(0, -3)
  let ending = IT_ENDINGS[cls][idx]

  if (cls === 'are') {
    // giocare -> giochi; pagare -> paghi (h before i-endings)
    if (/[cg]$/.test(stem) && ending.startsWith('i')) stem += 'h'
    // mangiare -> mangi; cominciare -> cominci (no double i)
    if (/[cg]i$/.test(stem) && ending.startsWith('i')) stem = stem.slice(0, -1)
  }
  // -ire verbs like capire take -isc-, but none of our gloss verbs need it so far
  void ending
  return stem + IT_ENDINGS[cls][idx]
}

/** "he/she speaks" or "lui/lei parla" */
export function glossVerb(verb: VerbEntry, person: PersonKey, primary: PrimaryLang): string {
  if (primary === 'it' && verb.glossIt) {
    return `${IT_PRONOUNS[person]} ${conjugateIt(verb.glossIt, person)}`
  }
  const base = verb.gloss.replace(/^to /, '').replace(/\s*\(.*\)$/, '')
  const form = base === 'be' ? EN_BE[person] : person === '3sg' ? verb.gloss3sg : base
  return `${EN_PRONOUNS[person]} ${form}`
}

const IT_INDEF: Record<string, string> = { il: 'un', lo: 'uno', la: 'una' }
const IT_PARTITIVE: Record<string, string> = { le: 'delle', i: 'dei', gli: 'degli' }

/** "the house" / "a house" / "some houses" — or "la casa" / "una casa" / "delle case" */
export function glossNoun(
  noun: NounEntry,
  opts: { def: boolean; number: 'sg' | 'pl' },
  primary: PrimaryLang,
): string {
  if (primary === 'it' && noun.glossIt) {
    if (opts.number === 'sg') {
      if (opts.def) return noun.glossIt
      const [art, ...rest] = noun.glossIt.split(' ')
      const indef = IT_INDEF[art]
      // l’acqua etc.: keep the definite form rather than guess the gender
      return indef ? `${indef} ${rest.join(' ')}` : noun.glossIt
    }
    const pl = noun.glossItPl ?? noun.glossIt
    if (opts.def) return pl
    const [art, ...rest] = pl.split(' ')
    const part = IT_PARTITIVE[art]
    return part ? `${part} ${rest.join(' ')}` : pl
  }
  const base = opts.number === 'sg' ? noun.gloss : (noun.glossPlural ?? `${noun.gloss}s`)
  if (opts.def) return `the ${base}`
  return opts.number === 'sg' ? `a ${base}` : `some ${base}`
}

/** bare noun gloss for '{gloss}' placeholders: bare English, articled Italian */
export function glossNounBare(noun: NounEntry, primary: PrimaryLang): string {
  if (primary === 'it' && noun.glossIt) return noun.glossIt
  return noun.gloss
}

function itGenderOf(glossIt: string): 'm' | 'f' {
  const art = glossIt.split(' ')[0]
  if (art === 'la' || art === 'le') return 'f'
  return 'm'
}

/** "the white house" / "la casa bianca" — Italian agreement follows the ITALIAN noun */
export function glossAdjNoun(
  adj: AdjEntry,
  noun: NounEntry,
  number: 'sg' | 'pl',
  primary: PrimaryLang,
): string {
  if (primary === 'it' && adj.glossItForms && noun.glossIt) {
    const g = itGenderOf(number === 'sg' ? noun.glossIt : (noun.glossItPl ?? noun.glossIt))
    const form =
      number === 'sg'
        ? adj.glossItForms[g]
        : adj.glossItForms[g === 'm' ? 'mpl' : 'fpl']
    return `${glossNoun(noun, { def: true, number }, 'it')} ${form}`
  }
  return `the ${adj.gloss} ${number === 'sg' ? noun.gloss : (noun.glossPlural ?? `${noun.gloss}s`)}`
}

/** vocab gloss for flashcards/recognition/production prompts */
export function glossLexeme(
  l: VerbEntry | NounEntry | AdjEntry,
  primary: PrimaryLang,
): string {
  if (primary === 'it') {
    if ('glossIt' in l && l.glossIt) return l.glossIt
    if ('glossItForms' in l && l.glossItForms) return l.glossItForms.m
  }
  return l.gloss
}
