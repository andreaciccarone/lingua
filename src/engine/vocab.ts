import type { ExerciseInstance, NounEntry, VerbEntry } from '../content/types'
import { hashSeed, mulberry32, pick, shuffled } from './exercises'

export type VocabLexeme = VerbEntry | NounEntry

function isNoun(l: VocabLexeme): l is NounEntry {
  return l.id.includes('/noun/')
}

/** display form: nouns carry their article (gender is part of the word) */
export function displayForm(l: VocabLexeme): string {
  if (isNoun(l) && l.es)
    return `${l.es.singularArticle ?? (l.es.gender === 'm' ? 'el' : 'la')} ${l.lemma}`
  if (isNoun(l) && l.de) return `${{ m: 'der', f: 'die', n: 'das' }[l.de.gender]} ${l.lemma}`
  return l.lemma
}

export function vocabSkillId(l: VocabLexeme, side: 'recog' | 'prod'): string {
  // "es/verb/hablar" -> "es/vocab/hablar:recog"
  const lemmaKey = l.id.split('/').pop()
  return `${l.lang}/vocab/${lemmaKey}:${side}`
}

/** new-word intro: front = target word (+TTS), back = gloss */
export function genFlashcard(l: VocabLexeme): ExerciseInstance {
  return {
    type: 'flashcard',
    lang: l.lang,
    sentence: [displayForm(l)],
    gloss: l.gloss,
    answer: displayForm(l),
    accepted: [],
    skillIds: [vocabSkillId(l, 'recog')],
    ttsText: displayForm(l),
  }
}

/** recognition: see the word, pick the English meaning */
export function genVocabRecognition(
  l: VocabLexeme,
  pool: VocabLexeme[],
  seed: string,
): ExerciseInstance {
  const rand = mulberry32(hashSeed(seed))
  const distractorGlosses = shuffled(
    pool.filter((p) => p.id !== l.id && p.gloss !== l.gloss),
    rand,
  )
    .slice(0, 3)
    .map((p) => ({ text: p.gloss, strategy: 'vocabConfusable' as const }))
  return {
    type: 'mc',
    lang: l.lang,
    sentence: [displayForm(l)],
    gapIndex: undefined,
    gloss: 'What does this mean?',
    answer: l.gloss,
    accepted: [],
    options: shuffled([{ text: l.gloss }, ...distractorGlosses], rand),
    skillIds: [vocabSkillId(l, 'recog')],
    ttsText: displayForm(l),
  }
}

/** production: see the English, type the word (nouns: with article) */
export function genVocabProduction(l: VocabLexeme, seed: string): ExerciseInstance {
  void seed
  const full = displayForm(l)
  const accepted = isNoun(l) && l.lang === 'es' ? [l.lemma] : [] // Spanish: bare noun accepted
  return {
    type: 'cloze',
    lang: l.lang,
    sentence: ['___'],
    gapIndex: 0,
    gloss: isNoun(l) ? `the ${l.gloss}` : l.gloss,
    answer: full,
    accepted,
    skillIds: [vocabSkillId(l, 'prod')],
    ttsText: full,
    // articles and endings are all meaning-bearing here; no suffix looseness
    strictSuffixLen: 0,
  }
}

/** pack-start warmup: match words to meanings */
export function genVocabMatch(lexemes: VocabLexeme[], seed: string): ExerciseInstance {
  const rand = mulberry32(hashSeed(seed))
  const chosen = shuffled(lexemes, rand).slice(0, 5)
  return {
    type: 'match',
    lang: chosen[0].lang,
    sentence: [],
    gloss: 'Match each word with its meaning',
    answer: '',
    accepted: [],
    pairs: chosen.map((l) => [displayForm(l), l.gloss]),
    skillIds: chosen.map((l) => vocabSkillId(l, 'recog')),
  }
}

export { pick }
