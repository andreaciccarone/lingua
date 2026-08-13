import type {
  AdjEntry,
  DistractorStrategy,
  ExerciseInstance,
  GermanCase,
  LocText,
  NounEntry,
  PersonKey,
  PrimaryLang,
  VerbEntry,
} from '../content/types'
import { loc, PERSONS } from '../content/types'
import { glossAdjNounDe, glossNounBare, glossVerb } from '../i18n/gloss-it'
import { tFor } from '../i18n/ui'
import { conjugateDe } from './conjugator/de'
import { adjEndingDe, declineDe, type DeNumber } from './declension/de'
import { hashSeed, mulberry32, pick, pickDistractors, shuffled } from './exercises'

const DE_PRONOUNS: Record<PersonKey, string[]> = {
  '1sg': ['ich'],
  '2sg': ['du'],
  '3sg': ['er', 'sie', 'es'],
  '1pl': ['wir'],
  '2pl': ['ihr'],
  '3pl': ['sie'],
}

interface Candidate {
  text: string
  strategy: DistractorStrategy
}

function deConjugationCandidates(
  verb: VerbEntry,
  person: PersonKey,
  tense: 'pres' | 'praet',
): Candidate[] {
  const out: Candidate[] = []
  for (const p of PERSONS) {
    if (p === person) continue
    out.push({ text: conjugateDe(verb, tense, p).form, strategy: 'wrongPerson' })
  }
  // missing vowel change: *du fahrst
  if (tense === 'pres' && verb.de?.vowelChange && (person === '2sg' || person === '3sg')) {
    const lemma = verb.lemma
    const stem = lemma.endsWith('en') ? lemma.slice(0, -2) : lemma.slice(0, -1)
    out.push({
      text: stem + (person === '2sg' ? 'st' : 't'),
      strategy: 'missingVowelChange',
    })
  }
  out.push({ text: verb.lemma, strategy: 'infinitive' })
  return out
}

export function genConjugationDrillDe(params: {
  verb: VerbEntry
  person: PersonKey
  topicId: string
  type: 'mc' | 'cloze'
  seed: string
  primary: PrimaryLang
  tense?: 'pres' | 'praet'
}): ExerciseInstance {
  const { verb, person, topicId, type, seed, primary, tense = 'pres' } = params
  const rand = mulberry32(hashSeed(seed))
  const pronoun = pick(DE_PRONOUNS[person], rand)
  const { form } = conjugateDe(verb, tense, person)

  const base: ExerciseInstance = {
    type,
    lang: 'de',
    sentence: [capitalize(pronoun), '___', `(${verb.lemma})`],
    gapIndex: 1,
    gloss: glossVerb(verb, person, primary, tense),
    answer: form,
    accepted: [],
    skillIds: [`${topicId}:${person}`],
    ttsText: `${pronoun} ${form}`,
    // German endings are 1-2 chars; -st/-t/-en are all morphemic
    strictSuffixLen: Math.min(2, form.length - 1),
  }
  if (type === 'mc') {
    base.options = shuffled(
      [
        { text: form },
        ...pickDistractors(deConjugationCandidates(verb, person, tense), form, 3, rand),
      ],
      rand,
    )
  }
  return base
}

/** case/article pick: "Ich sehe ___ Mann" → den. Distractors: wrong case, wrong gender. */
export function genCaseArticleDrill(
  noun: NounEntry,
  opts: {
    case: GermanCase
    det: 'def' | 'indef' | 'kein'
    number: DeNumber
    topicId: string
    cellId: string
    /** sentence frame around the gap; token '___' marks the article slot, '{noun}' the noun */
    frame: { tokens: string[]; gloss: LocText }
    seed: string
    primary: PrimaryLang
  },
): ExerciseInstance {
  const { topicId, cellId, frame, seed, primary } = opts
  const rand = mulberry32(hashSeed(seed))
  const { article, noun: nounForm } = declineDe(noun, {
    case: opts.case,
    det: opts.det,
    number: opts.number,
  })

  const candidates: Candidate[] = []
  for (const c of ['nom', 'acc', 'dat'] as GermanCase[]) {
    if (c === opts.case) continue
    candidates.push({
      text: declineDe(noun, { case: c, det: opts.det, number: opts.number }).article,
      strategy: 'wrongCaseArticle',
    })
  }
  const g = noun.de!.gender
  const otherGenders = (['m', 'f', 'n'] as const).filter((x) => x !== g)
  for (const og of otherGenders) {
    const fake: NounEntry = { ...noun, de: { ...noun.de!, gender: og } }
    candidates.push({
      text: declineDe(fake, { case: opts.case, det: opts.det, number: opts.number }).article,
      strategy: 'wrongGenderArticle',
    })
  }
  // Plural articles ignore gender (always die/den), so gender swaps collapse onto
  // the answer. The live error there is reaching for a singular article instead.
  if (opts.number === 'pl') {
    for (const sg of ['m', 'f', 'n'] as const) {
      const fake: NounEntry = { ...noun, de: { ...noun.de!, gender: sg } }
      candidates.push({
        text: declineDe(fake, { case: opts.case, det: opts.det, number: 'sg' }).article,
        strategy: 'wrongNumber',
      })
    }
  }

  const sentence = frame.tokens.map((t) => (t === '{noun}' ? nounForm : t))
  const gapIndex = sentence.indexOf('___')
  return {
    type: 'mc',
    lang: 'de',
    sentence,
    gapIndex,
    gloss: loc(frame.gloss, primary).replace('{gloss}', glossNounBare(noun, primary)),
    answer: article,
    accepted: [],
    options: shuffled([{ text: article }, ...pickDistractors(candidates, article, 3, rand)], rand),
    skillIds: [`${topicId}:${cellId}`],
    ttsText: sentence.map((t, i) => (i === gapIndex ? article : t)).join(' '),
  }
}

/** Perfekt drill. aux mode: "Ich ___ gegessen" → habe (wrongAux/wrongPerson
 *  distractors). participle mode: "Ich habe ___ (essen)" → gegessen (cloze). */
export function genPerfectDrill(
  verb: VerbEntry,
  opts: {
    mode: 'aux' | 'participle'
    person: PersonKey
    topicId: string
    cellId: string
    auxVerbs: { haben: VerbEntry; sein: VerbEntry }
    seed: string
    primary: PrimaryLang
  },
): ExerciseInstance {
  const { mode, person, topicId, cellId, auxVerbs, seed, primary } = opts
  const de = verb.de
  if (!de) throw new Error(`${verb.id} has no German morphology`)
  const rand = mulberry32(hashSeed(seed))
  const pronoun = pick(DE_PRONOUNS[person], rand)
  const auxVerb = de.aux === 'sein' ? auxVerbs.sein : auxVerbs.haben
  const otherAuxVerb = de.aux === 'sein' ? auxVerbs.haben : auxVerbs.sein
  const aux = conjugateDe(auxVerb, 'pres', person).form
  const gloss = glossVerb(verb, person, primary, 'perf')

  if (mode === 'aux') {
    const candidates: Candidate[] = [
      { text: conjugateDe(otherAuxVerb, 'pres', person).form, strategy: 'wrongAux' },
      ...PERSONS.filter((p) => p !== person).map((p) => ({
        text: conjugateDe(auxVerb, 'pres', p).form,
        strategy: 'wrongPerson' as const,
      })),
    ]
    return {
      type: 'mc',
      lang: 'de',
      sentence: [capitalize(pronoun), '___', de.participle],
      gapIndex: 1,
      gloss,
      answer: aux,
      accepted: [],
      options: shuffled([{ text: aux }, ...pickDistractors(candidates, aux, 3, rand)], rand),
      skillIds: [`${topicId}:${cellId}`],
      ttsText: `${pronoun} ${aux} ${de.participle}`,
    }
  }

  return {
    type: 'cloze',
    lang: 'de',
    sentence: [capitalize(pronoun), aux, '___', `(${verb.lemma})`],
    gapIndex: 2,
    gloss,
    answer: de.participle,
    accepted: [],
    skillIds: [`${topicId}:${cellId}`],
    ttsText: `${pronoun} ${aux} ${de.participle}`,
    // ge- prefix and -t/-en ending are the morphology under test
    strictSuffixLen: Math.min(2, de.participle.length - 1),
  }
}

/** attributive adjective endings: "Das ist ein ___ Mann" → guter.
 *  Distractors are the same adjective with the other endings. */
export function genAdjEndingDrill(
  adj: AdjEntry,
  noun: NounEntry,
  opts: {
    case: GermanCase
    det: 'def' | 'indef'
    topicId: string
    cellId: string
    seed: string
    primary: PrimaryLang
  },
): ExerciseInstance {
  const { topicId, cellId, seed, primary } = opts
  const de = noun.de
  if (!de) throw new Error(`${noun.id} has no German morphology`)
  const rand = mulberry32(hashSeed(seed))
  const { article, noun: nounForm } = declineDe(noun, {
    case: opts.case,
    det: opts.det,
    number: 'sg',
  })
  const ending = adjEndingDe({ case: opts.case, gender: de.gender, number: 'sg', det: opts.det })
  const answer = adj.lemma + ending

  // Weak endings collapse to -e/-en, so same-declension swaps alone can't fill a
  // bank. Learners also mix the declension CLASSES (*der guter Mann), so draw
  // candidates across weak, mixed and strong endings alike.
  const candidates: Candidate[] = []
  for (const det of ['def', 'indef', 'none'] as const) {
    for (const g of ['m', 'f', 'n'] as const) {
      for (const c of ['nom', 'acc', 'dat'] as GermanCase[]) {
        if (det === opts.det && g === de.gender && c === opts.case) continue
        candidates.push({
          text: adj.lemma + adjEndingDe({ case: c, gender: g, number: 'sg', det }),
          strategy: g === de.gender ? 'wrongCaseArticle' : 'wrongGenderArticle',
        })
      }
    }
  }

  const frame =
    opts.case === 'nom'
      ? ['Das', 'ist', article, '___', nounForm]
      : ['Ich', 'sehe', article, '___', nounForm]
  const gapIndex = frame.indexOf('___')
  return {
    type: 'mc',
    lang: 'de',
    sentence: frame,
    gapIndex,
    gloss: glossAdjNounDe(adj, noun, primary),
    answer,
    accepted: [],
    options: shuffled([{ text: answer }, ...pickDistractors(candidates, answer, 3, rand)], rand),
    skillIds: [`${topicId}:${cellId}`],
    ttsText: frame.map((t, i) => (i === gapIndex ? answer : t)).join(' '),
  }
}

/** pronoun ↔ conjugated-form match board (German) */
export function genMatchDrillDe(params: {
  verb: VerbEntry
  topicId: string
  seed: string
  primary: PrimaryLang
  tense?: 'pres' | 'praet'
}): ExerciseInstance {
  const { verb, topicId, seed, primary, tense = 'pres' } = params
  const rand = mulberry32(hashSeed(seed))
  const forms = Object.fromEntries(
    PERSONS.map((p) => [p, conjugateDe(verb, tense, p).form]),
  ) as Record<PersonKey, string>
  const persons = shuffled(PERSONS, rand)
    .slice(0, 5)
    .filter((p, _, all) => !all.some((q) => q !== p && forms[q] === forms[p]))
  return {
    type: 'match',
    lang: 'de',
    sentence: [],
    gloss: tFor(primary)('matchPronounForm', { verb: verb.lemma }),
    answer: '',
    accepted: [],
    pairs: persons.map((p) => [DE_PRONOUNS[p][0], forms[p]]),
    skillIds: persons.map((p) => `${topicId}:${p}`),
  }
}

/** plural production: "der Tisch → die ___" (stored plurals, no typo tolerance) */
export function genPluralDrillDe(
  noun: NounEntry,
  opts: { topicId: string; cellId: string; seed: string; primary: PrimaryLang },
): ExerciseInstance {
  void opts.seed
  const sg = declineDe(noun, { case: 'nom', det: 'def', number: 'sg' })
  const plural = noun.de!.plural
  return {
    type: 'cloze',
    lang: 'de',
    sentence: [sg.article, sg.noun, '→', 'die', '___'],
    gapIndex: 4,
    gloss: tFor(opts.primary)('pluralOf', { noun: noun.lemma }),
    answer: plural,
    accepted: [],
    skillIds: [`${opts.topicId}:${opts.cellId}`],
    ttsText: `die ${plural}`,
    // umlauts and endings are the whole point — no typo tolerance at all
    strictSuffixLen: plural.length,
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
