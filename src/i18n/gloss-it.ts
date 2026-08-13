import type {
  AdjEntry,
  NounEntry,
  PersonKey,
  PrimaryLang,
  TenseKey,
  VerbEntry,
} from '../content/types'
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

const IT_REFLEXIVE: Record<PersonKey, string> = {
  '1sg': 'mi',
  '2sg': 'ti',
  '3sg': 'si',
  '1pl': 'ci',
  '2pl': 'vi',
  '3pl': 'si',
}

/** conjugate an Italian gloss verb in the present.
 *  Handles reflexives ("alzarsi" → "mi alzo") and multi-word glosses
 *  ("fare la spesa" → "faccio la spesa") — first word is the verb. */
export function conjugateIt(infinitive: string, person: PersonKey): string {
  const [head, ...tail] = infinitive.split(' ')
  const suffix = tail.length ? ' ' + tail.join(' ') : ''

  // reflexive: alzarsi -> alzare + clitic
  if (head.endsWith('rsi')) {
    const base = head.slice(0, -3) + 're'
    return `${IT_REFLEXIVE[person]} ${conjugateItPlain(base, person)}${suffix}`
  }
  return conjugateItPlain(head, person) + suffix
}

function conjugateItPlain(infinitive: string, person: PersonKey): string {
  const idx = PERSONS.indexOf(person)
  const irregular = IT_IRREGULAR[infinitive]
  if (irregular) return irregular[idx]

  const cls = infinitive.slice(-3) as 'are' | 'ere' | 'ire'
  if (!IT_ENDINGS[cls]) return infinitive
  let stem = infinitive.slice(0, -3)
  const ending = IT_ENDINGS[cls][idx]

  if (cls === 'are') {
    // giocare -> giochi; pagare -> paghi (h before i-endings)
    if (/[cg]$/.test(stem) && ending.startsWith('i')) stem += 'h'
    // mangiare -> mangi; cominciare -> cominci (no double i)
    if (/[cg]i$/.test(stem) && ending.startsWith('i')) stem = stem.slice(0, -1)
  }
  return stem + ending
}

/** irregular Italian past participles; everything else follows -ato/-uto/-ito */
const IT_PARTICIPLE: Record<string, string> = {
  essere: 'stato',
  fare: 'fatto',
  dire: 'detto',
  vedere: 'visto',
  mettere: 'messo',
  prendere: 'preso',
  leggere: 'letto',
  scrivere: 'scritto',
  bere: 'bevuto',
  comprendere: 'compreso',
  conoscere: 'conosciuto',
  rimanere: 'rimasto',
  venire: 'venuto',
  aprire: 'aperto',
  vivere: 'vissuto',
  correre: 'corso',
  chiedere: 'chiesto',
  piacere: 'piaciuto',
}

/** verbs that build the passato prossimo with essere (agreeing participle) */
const IT_ESSERE_VERBS = new Set([
  'essere',
  'andare',
  'venire',
  'uscire',
  'arrivare',
  'tornare',
  'entrare',
  'partire',
  'stare',
  'rimanere',
  'piacere',
])

const PLURAL_PERSONS: ReadonlySet<PersonKey> = new Set(['1pl', '2pl', '3pl'])

function participleIt(infinitive: string): string {
  const irregular = IT_PARTICIPLE[infinitive]
  if (irregular) return irregular
  if (infinitive.endsWith('are')) return infinitive.slice(0, -3) + 'ato'
  if (infinitive.endsWith('ere')) return infinitive.slice(0, -3) + 'uto'
  if (infinitive.endsWith('ire')) return infinitive.slice(0, -3) + 'ito'
  return infinitive
}

/** participle agrees with the subject when the auxiliary is essere */
function agree(participle: string, person: PersonKey): string {
  return PLURAL_PERSONS.has(person) ? participle.slice(0, -1) + 'i' : participle
}

/** irregular imperfetto stems (essere is fully special-cased below) */
const IT_IMPF_IRREGULAR: Record<string, string> = {
  fare: 'facev',
  dire: 'dicev',
  bere: 'bevev',
}

/** imperfetto — the tense Italians use for the Spanish imperfecto: "parlavo" */
export function imperfIt(infinitive: string, person: PersonKey): string {
  const [head, ...tail] = infinitive.split(' ')
  const suffix = tail.length ? ' ' + tail.join(' ') : ''
  const idx = PERSONS.indexOf(person)

  if (head.endsWith('rsi')) {
    const base = head.slice(0, -3) + 're'
    return `${IT_REFLEXIVE[person]} ${imperfIt(base, person)}${suffix}`
  }
  if (head === 'essere') {
    return ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'][idx] + suffix
  }
  const endings = ['o', 'i', 'a', 'amo', 'ate', 'ano']
  const irregularStem = IT_IMPF_IRREGULAR[head]
  if (irregularStem) return irregularStem + endings[idx] + suffix
  const cls = head.slice(-3)
  const stem = head.slice(0, -3)
  const vowel = cls === 'are' ? 'av' : cls === 'ere' ? 'ev' : 'iv'
  return stem + vowel + endings[idx] + suffix
}

/** passato prossimo — how an Italian actually renders the Spanish preterite:
 *  "ho parlato", "sono andato", "mi sono alzato" */
export function pastIt(infinitive: string, person: PersonKey): string {
  const [head, ...tail] = infinitive.split(' ')
  const suffix = tail.length ? ' ' + tail.join(' ') : ''

  if (head.endsWith('rsi')) {
    const base = head.slice(0, -3) + 're'
    const part = agree(participleIt(base), person)
    return `${IT_REFLEXIVE[person]} ${conjugateItPlain('essere', person)} ${part}${suffix}`
  }
  const part = participleIt(head)
  if (IT_ESSERE_VERBS.has(head)) {
    return `${conjugateItPlain('essere', person)} ${agree(part, person)}${suffix}`
  }
  return `${conjugateItPlain('avere', person)} ${part}${suffix}`
}

// ---------- English simple past (secondary instruction language) ----------

const EN_PAST: Record<string, string> = {
  be: 'was/were',
  have: 'had',
  do: 'did',
  go: 'went',
  speak: 'spoke',
  tell: 'told',
  meet: 'met',
  lose: 'lost',
  bring: 'brought',
  feel: 'felt',
  send: 'sent',
  spend: 'spent',
  cost: 'cost',
  say: 'said',
  see: 'saw',
  give: 'gave',
  put: 'put',
  come: 'came',
  know: 'knew',
  eat: 'ate',
  drink: 'drank',
  sleep: 'slept',
  read: 'read',
  write: 'wrote',
  take: 'took',
  find: 'found',
  run: 'ran',
  buy: 'bought',
  pay: 'paid',
  think: 'thought',
  begin: 'began',
  understand: 'understood',
  sing: 'sang',
  get: 'got',
  wear: 'wore',
  leave: 'left',
  sit: 'sat',
  make: 'made',
}

function pastEn(base: string): string {
  const [head, ...tail] = base.split(' ')
  const suffix = tail.length ? ' ' + tail.join(' ') : ''
  const irregular = EN_PAST[head]
  if (irregular) return irregular + suffix
  if (head.endsWith('e')) return head + 'd' + suffix
  if (/[^aeiou]y$/.test(head)) return head.slice(0, -1) + 'ied' + suffix
  return head + 'ed' + suffix
}

/** "he/she speaks" or "lui/lei parla"; past tense renders as
 *  passato prossimo in Italian and simple past in English */
export function glossVerb(
  verb: VerbEntry,
  person: PersonKey,
  primary: PrimaryLang,
  tense: TenseKey = 'pres',
): string {
  const past = tense === 'pret' || tense === 'perf' || tense === 'praet'
  if (primary === 'it' && verb.glossIt) {
    const form =
      tense === 'impf'
        ? imperfIt(verb.glossIt, person)
        : past
          ? pastIt(verb.glossIt, person)
          : conjugateIt(verb.glossIt, person)
    return `${IT_PRONOUNS[person]} ${form}`
  }
  const base = verb.gloss.replace(/^to /, '').replace(/\s*\(.*\)$/, '')
  if (tense === 'impf') return `${EN_PRONOUNS[person]} used to ${base}`
  if (past) return `${EN_PRONOUNS[person]} ${pastEn(base)}`
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

// elided l’ is handled separately (defaults to masculine — good enough for glosses)
const IT_GENDER_OF_ARTICLE: Record<string, 'm' | 'f'> = {
  il: 'm', lo: 'm', la: 'f', le: 'f', i: 'm', gli: 'm',
}

/** "the good man" / "l’uomo buono" — Italian agreement follows the ITALIAN noun */
export function glossAdjNounDe(adj: AdjEntry, noun: NounEntry, primary: PrimaryLang): string {
  if (primary === 'it' && adj.glossItForms && noun.glossIt) {
    const art = noun.glossIt.split(' ')[0]
    const g = art.startsWith('l’') ? 'm' : (IT_GENDER_OF_ARTICLE[art] ?? 'm')
    return `${noun.glossIt} ${adj.glossItForms[g]}`
  }
  return `the ${adj.gloss.split(' / ')[0]} ${noun.gloss.split(' (')[0]}`
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
