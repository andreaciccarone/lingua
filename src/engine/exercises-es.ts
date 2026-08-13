import type {
  AdjEntry,
  ExerciseInstance,
  NounEntry,
  PersonKey,
  PrimaryLang,
  VerbEntry,
} from '../content/types'
import { PERSONS } from '../content/types'
import { ES_HABER, participleEs } from './conjugator/es'
import { adjAgreeEs, articleEs, pluralEs, type EsNumber } from './morph/es'
import { glossAdjNoun, glossNoun, glossVerb } from '../i18n/gloss-it'
import { tFor } from '../i18n/ui'
import { hashSeed, mulberry32, pick, pickDistractors, shuffled } from './exercises'

function nounForm(noun: NounEntry, number: EsNumber): string {
  return number === 'sg' ? noun.lemma : pluralEs(noun)
}

/** learner errors for adjectives that don't inflect for gender: *granda, *azulo */
function overAgreementForms(
  adj: AdjEntry,
  number: EsNumber,
): { text: string; strategy: 'wrongGenderArticle' }[] {
  if (!adj.es?.invariable) return []
  const base = adj.lemma
  const stem = base.endsWith('e') ? base.slice(0, -1) : base
  const plural = number === 'pl' ? 's' : ''
  return [
    { text: stem + 'o' + plural, strategy: 'wrongGenderArticle' },
    { text: stem + 'a' + plural, strategy: 'wrongGenderArticle' },
  ]
}

/** article pick: "___ casa" → la. Distractors are wrong-gender / wrong-number articles. */
export function genArticleDrill(
  noun: NounEntry,
  opts: {
    def: boolean
    number: EsNumber
    topicId: string
    cellId: string
    seed: string
    primary: PrimaryLang
  },
): ExerciseInstance {
  const { def, number, topicId, cellId, seed, primary } = opts
  const rand = mulberry32(hashSeed(seed))
  const es = noun.es!
  const answer = articleEs(noun, def, number)
  const otherGender: NounEntry = {
    ...noun,
    es: { ...es, gender: es.gender === 'm' ? 'f' : 'm', singularArticle: undefined },
  }
  const candidates = [
    { text: articleEs(otherGender, def, number), strategy: 'wrongGenderArticle' as const },
    { text: articleEs(noun, def, number === 'sg' ? 'pl' : 'sg'), strategy: 'wrongNumber' as const },
    { text: articleEs(otherGender, def, number === 'sg' ? 'pl' : 'sg'), strategy: 'wrongGenderArticle' as const },
    { text: articleEs(noun, !def, number), strategy: 'wrongGenderArticle' as const },
  ]
  return {
    type: 'mc',
    lang: 'es',
    sentence: ['___', nounForm(noun, number)],
    gapIndex: 0,
    gloss: glossNoun(noun, { def, number }, primary),
    answer,
    accepted: [],
    options: shuffled([{ text: answer }, ...pickDistractors(candidates, answer, 3, rand)], rand),
    skillIds: [`${topicId}:${cellId}`],
    ttsText: `${answer} ${nounForm(noun, number)}`,
  }
}

/** plural production: "la casa → las ___" (typed) */
export function genPluralDrill(
  noun: NounEntry,
  opts: { topicId: string; cellId: string; seed: string; primary: PrimaryLang },
): ExerciseInstance {
  void opts.seed
  const plural = pluralEs(noun)
  return {
    type: 'cloze',
    lang: 'es',
    sentence: [articleEs(noun, true, 'sg'), noun.lemma, '→', articleEs(noun, true, 'pl'), '___'],
    gapIndex: 4,
    gloss: tFor(opts.primary)('pluralOf', { noun: noun.lemma }),
    answer: plural,
    accepted: [],
    skillIds: [`${opts.topicId}:${opts.cellId}`],
    ttsText: `${articleEs(noun, true, 'pl')} ${plural}`,
    // the plural suffix is the whole point — no typo tolerance on it
    strictSuffixLen: plural.length - noun.lemma.length + 1,
  }
}

/** adjective agreement: "la casa ___" → blanca */
export function genAdjAgreeDrill(
  adj: AdjEntry,
  noun: NounEntry,
  opts: { number: EsNumber; topicId: string; seed: string; primary: PrimaryLang },
): ExerciseInstance {
  const { number, topicId, seed, primary } = opts
  const rand = mulberry32(hashSeed(seed))
  const gender = noun.es!.gender
  const answer = adjAgreeEs(adj, gender, number)
  const candidates = (
    [
      ['m', 'sg'],
      ['f', 'sg'],
      ['m', 'pl'],
      ['f', 'pl'],
    ] as const
  )
    .map(([g, n]) => ({
      text: adjAgreeEs(adj, g, n),
      strategy: (g !== gender ? 'wrongGenderArticle' : 'wrongNumber') as
        | 'wrongGenderArticle'
        | 'wrongNumber',
    }))
    .filter((c) => c.text !== answer)
    // Invariable adjectives (grande, azul) have too few distinct forms to fill a
    // bank. Their real failure mode is over-agreement — *granda, *azula — which
    // makes a far better distractor than another copy of the same form.
    .concat(overAgreementForms(adj, number))
  return {
    type: 'mc',
    lang: 'es',
    sentence: [articleEs(noun, true, number), nounForm(noun, number), '___'],
    gapIndex: 2,
    gloss: glossAdjNoun(adj, noun, number, primary),
    answer,
    accepted: [],
    options: shuffled([{ text: answer }, ...pickDistractors(candidates, answer, 3, rand)], rand),
    skillIds: [`${topicId}:${gender}${number === 'pl' ? '.pl' : ''}`],
    ttsText: `${articleEs(noun, true, number)} ${nounForm(noun, number)} ${answer}`,
  }
}


const ES_SUBJECTS: Record<PersonKey, string[]> = {
  '1sg': ['Yo'],
  '2sg': ['Tú'],
  '3sg': ['Él', 'Ella'],
  '1pl': ['Nosotros'],
  '2pl': ['Vosotros'],
  '3pl': ['Ellos', 'Ellas'],
}

/** Spanish perfect drill. aux mode: "Yo ___ comido" → he. participle mode:
 *  "Yo he ___ (comer)" → comido (cloze; irregular participles like hecho drilled). */
export function genPerfectDrillEs(
  verb: VerbEntry,
  opts: {
    mode: 'aux' | 'participle'
    person: PersonKey
    topicId: string
    cellId: string
    seed: string
    primary: PrimaryLang
  },
): ExerciseInstance {
  const { mode, person, topicId, cellId, seed, primary } = opts
  const rand = mulberry32(hashSeed(seed))
  const subject = pick(ES_SUBJECTS[person], rand)
  const aux = ES_HABER[person]
  const participle = participleEs(verb)
  const gloss = glossVerb(verb, person, primary, 'perf')

  if (mode === 'aux') {
    const candidates = PERSONS.filter((p) => p !== person).map((p) => ({
      text: ES_HABER[p],
      strategy: 'wrongPerson' as const,
    }))
    return {
      type: 'mc',
      lang: 'es',
      sentence: [subject, '___', participle],
      gapIndex: 1,
      gloss,
      answer: aux,
      accepted: [],
      options: shuffled([{ text: aux }, ...pickDistractors(candidates, aux, 3, rand)], rand),
      skillIds: [`${topicId}:${cellId}`],
      ttsText: `${subject.toLowerCase()} ${aux} ${participle}`,
    }
  }

  return {
    type: 'cloze',
    lang: 'es',
    sentence: [subject, aux, '___', `(${verb.lemma})`],
    gapIndex: 2,
    gloss,
    answer: participle,
    accepted: [],
    skillIds: [`${topicId}:${cellId}`],
    ttsText: `${subject.toLowerCase()} ${aux} ${participle}`,
    // -ado/-ido (and hecho/dicho endings) are the morphology under test
    strictSuffixLen: 3,
  }
}
