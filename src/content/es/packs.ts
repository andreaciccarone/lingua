import type { VocabPack } from '../types'
import { ES_NOUNS } from './morphology/nouns'
import { ES_VERBS } from './morphology/verbs'
import { ES_ADJS } from './morphology/adjectives'
import type { VocabLexeme } from '../../engine/vocab'

export const ES_PACK_BASICS: VocabPack = {
  id: 'es-pack-basics',
  lang: 'es',
  unitId: 'es-u1',
  title: { en: 'First words', it: 'Prime parole' },
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

export const ES_PACK_FAMILY: VocabPack = {
  id: 'es-pack-family',
  lang: 'es',
  unitId: 'es-u1',
  title: { en: 'Family', it: 'La famiglia' },
  lexemeIds: [
    'es/noun/familia',
    'es/noun/padre',
    'es/noun/madre',
    'es/noun/hermano',
    'es/noun/hermana',
    'es/noun/hijo',
    'es/noun/hija',
    'es/noun/abuelo',
    'es/noun/abuela',
    'es/noun/niño',
    'es/noun/niña',
  ],
}

export const ES_PACK_DESCRIBE: VocabPack = {
  id: 'es-pack-describe',
  lang: 'es',
  unitId: 'es-u1',
  title: { en: 'Describing things', it: 'Descrivere le cose' },
  lexemeIds: [
    'es/adj/alto',
    'es/adj/bajo',
    'es/adj/grande',
    'es/adj/pequeño',
    'es/adj/nuevo',
    'es/adj/viejo',
    'es/adj/bonito',
    'es/adj/bueno',
    'es/adj/malo',
    'es/adj/feliz',
  ],
}

export const ES_PACK_FOOD: VocabPack = {
  id: 'es-pack-food',
  lang: 'es',
  unitId: 'es-u2',
  title: { en: 'Food & drink', it: 'Cibo e bevande' },
  lexemeIds: [
    'es/noun/leche',
    'es/noun/queso',
    'es/noun/huevo',
    'es/noun/carne',
    'es/noun/pescado',
    'es/noun/arroz',
    'es/noun/fruta',
    'es/noun/naranja',
    'es/noun/vino',
    'es/noun/cerveza',
    'es/verb/comer',
    'es/verb/beber',
    'es/verb/cocinar',
    'es/verb/tomar',
  ],
}

export const ES_PACK_TOWN: VocabPack = {
  id: 'es-pack-town',
  lang: 'es',
  unitId: 'es-u2',
  title: { en: 'Around town', it: 'In città' },
  lexemeIds: [
    'es/noun/ciudad',
    'es/noun/escuela',
    'es/noun/restaurante',
    'es/noun/tienda',
    'es/noun/parque',
    'es/noun/calle',
    'es/noun/playa',
    'es/noun/país',
    'es/noun/pueblo',
    'es/noun/mercado',
    'es/verb/caminar',
  ],
}

export const ES_PACK_DAILY: VocabPack = {
  id: 'es-pack-daily',
  lang: 'es',
  unitId: 'es-u2',
  title: { en: 'Daily life', it: 'Vita quotidiana' },
  lexemeIds: [
    'es/verb/estudiar',
    'es/verb/escuchar',
    'es/verb/mirar',
    'es/verb/comprar',
    'es/verb/leer',
    'es/verb/escribir',
    'es/verb/aprender',
    'es/noun/trabajo',
    'es/noun/escuela',
    'es/noun/día',
    'es/noun/noche',
  ],
}

export const ES_PACKS: VocabPack[] = [
  ES_PACK_BASICS,
  ES_PACK_FAMILY,
  ES_PACK_DESCRIBE,
  ES_PACK_FOOD,
  ES_PACK_TOWN,
  ES_PACK_DAILY,
]

/** lemma-key ("casa") -> lexeme, for resolving vocab skill ids back to words */
export const ES_LEXEME_BY_KEY: Map<string, VocabLexeme> = new Map(
  [...ES_NOUNS, ...ES_VERBS, ...ES_ADJS].map((l) => [l.id.split('/').pop()!, l]),
)

export function packLexemes(pack: VocabPack): VocabLexeme[] {
  return pack.lexemeIds
    .map((id) => ES_LEXEME_BY_KEY.get(id.split('/').pop()!))
    .filter((l): l is VocabLexeme => !!l)
}
