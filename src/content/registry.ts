// One lookup surface over both languages' content.
import type {
  AdjEntry,
  Lang,
  NounEntry,
  ReadingPassage,
  Topic,
  Unit,
  VerbEntry,
  VocabPack,
} from './types'
import { ES_READINGS } from './es/readings'
import { DE_READINGS } from './de/readings'
import { ES_TOPIC_BY_ID, ES_UNITS, ES_UPCOMING_UNITS } from './es'
import { ES_LEXEME_BY_KEY, ES_PACKS } from './es/packs'
import { ES_VERB_BY_ID } from './es/morphology/verbs'
import { ES_NOUN_BY_ID } from './es/morphology/nouns'
import { ES_ADJ_BY_ID } from './es/morphology/adjectives'
import { DE_TOPIC_BY_ID, DE_UNITS, DE_UPCOMING_UNITS } from './de'
import { DE_LEXEME_BY_KEY, DE_PACKS } from './de/packs'
import { DE_VERB_BY_ID } from './de/morphology/verbs'
import { DE_NOUN_BY_ID } from './de/morphology/nouns'
import { DE_ADJ_BY_ID } from './de/morphology/adjectives'
import type { VocabLexeme } from '../engine/vocab'

export function topicById(id: string): Topic | undefined {
  return ES_TOPIC_BY_ID.get(id) ?? DE_TOPIC_BY_ID.get(id)
}

export function unitsFor(lang: Lang): Unit[] {
  return lang === 'es' ? ES_UNITS : DE_UNITS
}

export function upcomingUnitsFor(lang: Lang): { title: string; blurb: { en: string; it: string } }[] {
  return lang === 'es' ? ES_UPCOMING_UNITS : DE_UPCOMING_UNITS
}

export function packsFor(lang: Lang): VocabPack[] {
  return lang === 'es' ? ES_PACKS : DE_PACKS
}

export function packById(id: string): VocabPack | undefined {
  return [...ES_PACKS, ...DE_PACKS].find((p) => p.id === id)
}

export function lexemeByKey(lang: Lang, key: string): VocabLexeme | undefined {
  return lang === 'es' ? ES_LEXEME_BY_KEY.get(key) : DE_LEXEME_BY_KEY.get(key)
}

export function packLexemes(pack: VocabPack): VocabLexeme[] {
  return pack.lexemeIds
    .map((id) => lexemeByKey(pack.lang, id.split('/').pop()!))
    .filter((l): l is VocabLexeme => !!l)
}

export function verbById(id: string): VerbEntry | undefined {
  return ES_VERB_BY_ID.get(id) ?? DE_VERB_BY_ID.get(id)
}

export function nounById(id: string): NounEntry | undefined {
  return ES_NOUN_BY_ID.get(id) ?? DE_NOUN_BY_ID.get(id)
}

export function adjById(id: string): AdjEntry | undefined {
  return ES_ADJ_BY_ID.get(id) ?? DE_ADJ_BY_ID.get(id)
}

export function readingsFor(lang: Lang): ReadingPassage[] {
  return lang === 'es' ? ES_READINGS : DE_READINGS
}

export function readingById(id: string): ReadingPassage | undefined {
  return [...ES_READINGS, ...DE_READINGS].find((r) => r.id === id)
}
