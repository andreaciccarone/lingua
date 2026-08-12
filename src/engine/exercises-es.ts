import type { AdjEntry, ExerciseInstance, NounEntry } from '../content/types'
import { adjAgreeEs, articleEs, pluralEs, type EsNumber } from './morph/es'
import { hashSeed, mulberry32, pickDistractors, shuffled } from './exercises'

function nounForm(noun: NounEntry, number: EsNumber): string {
  return number === 'sg' ? noun.lemma : pluralEs(noun)
}

/** article pick: "___ casa" → la. Distractors are wrong-gender / wrong-number articles. */
export function genArticleDrill(
  noun: NounEntry,
  opts: { def: boolean; number: EsNumber; topicId: string; cellId: string; seed: string },
): ExerciseInstance {
  const { def, number, topicId, cellId, seed } = opts
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
    gloss: `${def ? 'the' : number === 'sg' ? 'a' : 'some'} ${number === 'sg' ? noun.gloss : (noun.glossPlural ?? noun.gloss + 's')}`,
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
  opts: { topicId: string; cellId: string; seed: string },
): ExerciseInstance {
  void opts.seed
  const plural = pluralEs(noun)
  return {
    type: 'cloze',
    lang: 'es',
    sentence: [articleEs(noun, true, 'sg'), noun.lemma, '→', articleEs(noun, true, 'pl'), '___'],
    gapIndex: 4,
    gloss: `plural of “${noun.lemma}”`,
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
  opts: { number: EsNumber; topicId: string; seed: string },
): ExerciseInstance {
  const { number, topicId, seed } = opts
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
  return {
    type: 'mc',
    lang: 'es',
    sentence: [articleEs(noun, true, number), nounForm(noun, number), '___'],
    gapIndex: 2,
    gloss: `the ${adj.gloss} ${number === 'sg' ? noun.gloss : (noun.glossPlural ?? noun.gloss + 's')}`,
    answer,
    accepted: [],
    options: shuffled([{ text: answer }, ...pickDistractors(candidates, answer, 3, rand)], rand),
    skillIds: [`${topicId}:${gender}${number === 'pl' ? '.pl' : ''}`],
    ttsText: `${articleEs(noun, true, number)} ${nounForm(noun, number)} ${answer}`,
  }
}
