// The content contract. Everything — engine, screens, SRS ids — depends on these types.
// IDs are stable and append-only: renaming an id orphans saved progress.

export type Lang = 'es' | 'de'
export type Cefr = 'A1' | 'A2'

/** the user's instruction language (what explanations/glosses are shown in) */
export type PrimaryLang = 'en' | 'it'

/** localizable text: a bare string is English (fallback), or per-language variants */
export type LocText = string | { en: string; it: string }

export function loc(text: LocText, primary: PrimaryLang): string {
  if (typeof text === 'string') return text
  return text[primary] ?? text.en
}

export type PersonKey = '1sg' | '2sg' | '3sg' | '1pl' | '2pl' | '3pl'
export const PERSONS: PersonKey[] = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl']

/** pres/pret Spanish; pres/perf/praet German */
export type TenseKey = 'pres' | 'pret' | 'perf' | 'praet'

export type GermanCase = 'nom' | 'acc' | 'dat'
export type GermanGender = 'm' | 'f' | 'n'
export type Determiner = 'def' | 'indef' | 'kein' | 'poss' | 'none'

// ---------- Lexicon ----------

export type SemTag =
  | 'human'
  | 'animal'
  | 'food'
  | 'drink'
  | 'place'
  | 'object'
  | 'vehicle'
  | 'clothing'
  | 'family'
  | 'profession'
  | 'nature'
  | 'time'
  | 'abstract'
  | 'transitive'
  | 'intransitive'
  | 'motion'
  | 'daily-routine'

export type SpanishVerbClass = 'ar' | 'er' | 'ir'
export type StemChange = 'e>ie' | 'o>ue' | 'e>i' | 'u>ue'

export interface VerbEntry {
  id: string // "es/verb/hablar"
  lang: Lang
  lemma: string
  gloss: string // "to speak"
  /** Italian gloss: infinitive ("parlare") */
  glossIt?: string
  gloss3sg: string // "speaks"
  tags: SemTag[]
  /** semantic tags of plausible direct objects ("comer" -> food) */
  objectTags?: SemTag[]
  es?: {
    class: SpanishVerbClass
    stemChange?: StemChange
    yoIrregular?: string // "hago"
    reflexive?: boolean
    /** full override cells; engine fills everything else */
    irregular?: Partial<Record<TenseKey, Partial<Record<PersonKey, string>>>>
  }
  de?: {
    /** strong-verb vowel change, du/er only: { du: "fährst", er: "fährt" } */
    vowelChange?: { du: string; er: string }
    /** lemma stored with prefix ("aufstehen"); prefix separates in main clauses */
    separablePrefix?: string
    aux: 'haben' | 'sein'
    participle: string // always stored explicitly
    governs?: 'acc' | 'dat'
    irregular?: Partial<Record<TenseKey, Partial<Record<PersonKey, string>>>>
  }
}

export interface NounEntry {
  id: string // "es/noun/casa"
  lang: Lang
  lemma: string
  gloss: string
  glossPlural?: string
  /** Italian gloss WITH definite article ("la casa") + plural ("le case") */
  glossIt?: string
  glossItPl?: string
  tags: SemTag[]
  /** singularArticle: feminine nouns with stressed initial /a/ take "el" (el agua) */
  es?: { gender: 'm' | 'f'; pluralIrregular?: string; singularArticle?: 'el' | 'la' }
  de?: { gender: GermanGender; plural: string; nDeclension?: boolean }
}

export interface AdjEntry {
  id: string // "es/adj/alto"
  lang: Lang
  lemma: string
  gloss: string
  /** Italian gloss forms ("bianco/bianca/bianchi/bianche") */
  glossItForms?: { m: string; f: string; mpl: string; fpl: string }
  /** which noun tags it can plausibly describe */
  tags: SemTag[]
  es?: {
    invariable?: boolean // "verde" — no gender forms
    formsOverride?: { m: string; f: string; mpl: string; fpl: string }
  }
  de?: { comparative?: string } // irregular comparatives only; predicative use only at A1
}

export type LexemeEntry = VerbEntry | NounEntry | AdjEntry

// ---------- Course structure ----------

export interface Unit {
  id: string // "es-u1"
  lang: Lang
  title: string
  blurb: LocText
  topicIds: string[] // ordered
  packIds: string[] // vocab packs belonging to this unit
}

export type ExplanationBlock =
  | { kind: 'prose'; md: LocText }
  | {
      kind: 'table'
      caption: LocText
      header: LocText[]
      rows: LocText[][]
      /** [row, col] cells to visually highlight */
      highlight?: [number, number][]
    }
  | { kind: 'example'; text: string; gloss: LocText; note?: LocText }
  | { kind: 'callout'; style: 'tip' | 'warning'; md: LocText }

export interface SkillCellDef {
  cellId: string // "2sg", "dat.m", "v2.basic"
  label: LocText // "tú form", "dative masculine"
}

export interface Topic {
  id: string // "es-present-ar"
  lang: Lang
  title: LocText
  ruleSummary: LocText // one-liner shown on path & in error hints
  cefr: Cefr
  dependencies: string[] // topic ids
  explanation: ExplanationBlock[]
  skillCells: SkillCellDef[]
  /** words introduced as flashcards before the drill */
  introLexemeIds: string[]
  drillItems: DrillSpec[]
  errorHints: Partial<Record<DistractorStrategy, LocText>>
}

export interface VocabPack {
  id: string // "es-pack-people"
  lang: Lang
  unitId: string
  title: LocText
  lexemeIds: string[]
}

// ---------- Drills & exercises ----------

export type ExerciseType =
  | 'match'
  | 'mc'
  | 'grid'
  | 'cloze'
  | 'tiles'
  | 'wordbank'
  | 'error-spot'
  | 'listen-cloze'
  | 'flashcard'

export type DistractorStrategy =
  | 'wrongPerson'
  | 'wrongClass'
  | 'missingStemChange'
  | 'overStemChange'
  | 'infinitive'
  | 'wrongTense'
  | 'wrongGenderArticle'
  | 'wrongCaseArticle'
  | 'wrongNumber'
  | 'serEstarSwap'
  | 'saberConocerSwap'
  | 'nichtKeinSwap'
  | 'weilDennOrderSwap'
  | 'missingVowelChange'
  | 'v2Violation'
  | 'prefixNotSeparated'
  | 'wrongAux'
  | 'missingPersonalA'
  | 'gustarNumberSwap'
  | 'vocabConfusable'

/** Concrete, typed drill recipes. A topic's lesson expands these in order. */
export type DrillSpec =
  | { gen: 'match-verb'; verbId: string; tense: TenseKey }
  | { gen: 'conj'; verbId: string; tense: TenseKey; persons: PersonKey[]; type: 'mc' | 'cloze' }
  | { gen: 'article'; nounIds: string[]; count: number; def: boolean; number: 'sg' | 'pl' | 'mix' }
  | { gen: 'plural'; nounIds: string[]; count: number }
  | { gen: 'adj-agree'; pairs: [adjId: string, nounId: string][]; count: number }
  | {
      gen: 'case-article'
      nounIds: string[]
      count: number
      case: GermanCase
      det: 'def' | 'indef' | 'kein'
      number: 'sg' | 'pl'
      /** '___' marks the article slot, '{noun}' the declined noun */
      frames: { tokens: string[]; gloss: LocText }[]
      cellId: string
    }
  | {
      gen: 'word-order'
      items: { answer: string; also?: string[]; gloss: LocText; cellId: string }[]
    }
  | {
      gen: 'perfect'
      verbIds: string[]
      count: number
      mode: 'aux' | 'participle' | 'mix'
      persons: PersonKey[]
      cellId: string
    }
  | { gen: 'authored'; exercises: AuthoredExerciseInstance[] }

/** A skill is the SRS unit: "topicId:cellId" for grammar, "lang/vocab/lemma:side" for words. */
export type SkillId = string

export interface ExerciseOption {
  text: string
  strategy?: DistractorStrategy // present on wrong options; drives the error hint
}

/**
 * The single runtime exercise shape. Generated and hand-authored exercises both
 * produce this, so the player UI is source-agnostic.
 */
export interface ExerciseInstance {
  type: ExerciseType
  lang: Lang
  /** rendered sentence tokens; gapIndex points into this array for cloze-likes */
  sentence: string[]
  gapIndex?: number
  gloss: string // English rendering / prompt
  answer: string
  accepted: string[] // normalized alternates (answer itself need not repeat)
  options?: ExerciseOption[] // mc / grid banks
  pairs?: [string, string][] // match
  tiles?: string[] // tiles / wordbank
  acceptedOrders?: number[][] // valid tile orders (indices into tiles)
  /** primary skill first; primary gets the SRS update */
  skillIds: SkillId[]
  ttsText?: string
  /** grammatical suffix length for typo-strictness (see grading.ts) */
  strictSuffixLen?: number
}

/** authored content carries localizable glosses; resolved to a plain
 *  ExerciseInstance (gloss: string) when the session is built */
export type AuthoredExerciseInstance = Omit<ExerciseInstance, 'gloss'> & { gloss: LocText }

export interface AuthoredExercise {
  id: string // "es-u1-ex-001"
  lang: Lang
  instance: ExerciseInstance
  hint?: string // overrides topic errorHints when set
}

