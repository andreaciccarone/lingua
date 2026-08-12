// The content contract. Everything — engine, screens, SRS ids — depends on these types.
// IDs are stable and append-only: renaming an id orphans saved progress.

export type Lang = 'es' | 'de'
export type Cefr = 'A1' | 'A2'

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
  tags: SemTag[]
  es?: { gender: 'm' | 'f'; pluralIrregular?: string }
  de?: { gender: GermanGender; plural: string; nDeclension?: boolean }
}

export interface AdjEntry {
  id: string // "es/adj/alto"
  lang: Lang
  lemma: string
  gloss: string
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
  blurb: string
  topicIds: string[] // ordered
  packIds: string[] // vocab packs belonging to this unit
}

export type ExplanationBlock =
  | { kind: 'prose'; md: string }
  | {
      kind: 'table'
      caption: string
      header: string[]
      rows: string[][]
      /** [row, col] cells to visually highlight */
      highlight?: [number, number][]
    }
  | { kind: 'example'; text: string; gloss: string; note?: string }
  | { kind: 'callout'; style: 'tip' | 'warning'; md: string }

export interface SkillCellDef {
  cellId: string // "2sg", "dat.m", "v2.basic"
  label: string // "tú form", "dative masculine"
}

export interface Topic {
  id: string // "es-present-ar"
  lang: Lang
  title: string
  ruleSummary: string // one-liner shown on path & in error hints
  cefr: Cefr
  dependencies: string[] // topic ids
  explanation: ExplanationBlock[]
  skillCells: SkillCellDef[]
  drill: DrillConfig
  errorHints: Partial<Record<DistractorStrategy, string>>
}

export interface VocabPack {
  id: string // "es-pack-people"
  lang: Lang
  unitId: string
  title: string
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

export interface GeneratorRecipe {
  generator: 'conjugation' | 'declension' | 'template'
  params: Record<string, unknown>
}

export interface DrillConfig {
  recipes: GeneratorRecipe[]
  typeWeights: Partial<Record<ExerciseType, number>>
}

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

export interface AuthoredExercise {
  id: string // "es-u1-ex-001"
  lang: Lang
  instance: ExerciseInstance
  hint?: string // overrides topic errorHints when set
}

export interface Lesson {
  id: string // "es-present-ar/l1"
  topicId: string
  /** new words introduced before the drill */
  introLexemeIds: string[]
  items: LessonItem[]
}

export type LessonItem =
  | { kind: 'static'; exerciseId: string }
  | { kind: 'generated'; recipe: GeneratorRecipe }
