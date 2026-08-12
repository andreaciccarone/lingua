import type { VocabPack } from '../types'
import { ES_NOUNS } from './morphology/nouns'
import { ES_VERBS } from './morphology/verbs'
import type { VocabLexeme } from '../../engine/vocab'

export const ES_PACK_BASICS: VocabPack = {
  id: 'es-pack-basics',
  lang: 'es',
  unitId: 'es-u1',
  title: 'First words',
  lexemeIds: [
    'es/noun/casa',
    'es/noun/libro',
    'es/noun/agua',
    'es/noun/café',
    'es/noun/pan',
    'es/noun/mujer',
    'es/noun/hombre',
    'es/noun/amigo',
    'es/verb/hablar',
    'es/verb/comer',
    'es/verb/beber',
    'es/verb/trabajar',
  ],
}

/** lemma-key ("casa") -> lexeme, for resolving vocab skill ids back to words */
export const ES_LEXEME_BY_KEY: Map<string, VocabLexeme> = new Map(
  [...ES_NOUNS, ...ES_VERBS].map((l) => [l.id.split('/').pop()!, l]),
)

export function packLexemes(pack: VocabPack): VocabLexeme[] {
  return pack.lexemeIds
    .map((id) => ES_LEXEME_BY_KEY.get(id.split('/').pop()!))
    .filter((l): l is VocabLexeme => !!l)
}
