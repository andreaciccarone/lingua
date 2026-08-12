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

export const ES_PACK_HOUSE: VocabPack = {
  id: 'es-pack-house',
  lang: 'es',
  unitId: 'es-u3',
  title: { en: 'Around the house', it: 'In casa' },
  lexemeIds: [
    'es/noun/cocina',
    'es/noun/baño',
    'es/noun/dormitorio',
    'es/noun/salón',
    'es/noun/cama',
    'es/noun/ducha',
    'es/noun/jardín',
    'es/noun/espejo',
    'es/noun/puerta',
    'es/noun/ventana',
    'es/noun/mesa',
    'es/noun/silla',
  ],
}

export const ES_PACK_ACTIONS: VocabPack = {
  id: 'es-pack-actions',
  lang: 'es',
  unitId: 'es-u3',
  title: { en: 'Verbs on the move', it: 'Verbi in movimento' },
  lexemeIds: [
    'es/verb/venir',
    'es/verb/salir',
    'es/verb/poner',
    'es/verb/decir',
    'es/verb/ver',
    'es/verb/dar',
    'es/verb/volver',
    'es/verb/jugar',
    'es/verb/dormir',
    'es/verb/empezar',
    'es/verb/pensar',
    'es/verb/entender',
  ],
}

export const ES_PACK_CLOTHES: VocabPack = {
  id: 'es-pack-clothes',
  lang: 'es',
  unitId: 'es-u4',
  title: { en: 'Clothes & shopping', it: 'Vestiti e acquisti' },
  lexemeIds: [
    'es/noun/camisa',
    'es/noun/camiseta',
    'es/noun/pantalón',
    'es/noun/vestido',
    'es/noun/falda',
    'es/noun/abrigo',
    'es/noun/chaqueta',
    'es/noun/sombrero',
    'es/noun/dinero',
    'es/noun/precio',
    'es/noun/regalo',
    'es/verb/llevar',
    'es/verb/pagar',
    'es/verb/buscar',
  ],
}

export const ES_PACK_DESCRIBE2: VocabPack = {
  id: 'es-pack-describe2',
  lang: 'es',
  unitId: 'es-u4',
  title: { en: 'More descriptions', it: 'Altre descrizioni' },
  lexemeIds: [
    'es/adj/rápido',
    'es/adj/lento',
    'es/adj/largo',
    'es/adj/corto',
    'es/adj/guapo',
    'es/adj/divertido',
    'es/adj/aburrido',
    'es/adj/importante',
    'es/adj/moreno',
    'es/adj/joven',
    'es/adj/simpático',
  ],
}

export const ES_PACK_ROUTINE: VocabPack = {
  id: 'es-pack-routine',
  lang: 'es',
  unitId: 'es-u5',
  title: { en: 'Daily routine', it: 'La routine quotidiana' },
  lexemeIds: [
    'es/verb/levantar',
    'es/verb/duchar',
    'es/verb/acostar',
    'es/verb/despertar',
    'es/verb/desayunar',
    'es/verb/cenar',
    'es/verb/terminar',
    'es/noun/desayuno',
    'es/noun/comida',
    'es/noun/cena',
    'es/noun/mañana',
    'es/noun/tarde',
  ],
}

export const ES_PACK_TRAVEL: VocabPack = {
  id: 'es-pack-travel',
  lang: 'es',
  unitId: 'es-u6',
  title: { en: 'Travel', it: 'In viaggio' },
  lexemeIds: [
    'es/noun/viaje',
    'es/noun/tren',
    'es/noun/avión',
    'es/noun/autobús',
    'es/noun/hotel',
    'es/noun/maleta',
    'es/noun/billete',
    'es/noun/aeropuerto',
    'es/noun/mar',
    'es/noun/montaña',
    'es/verb/viajar',
    'es/verb/visitar',
    'es/verb/llegar',
  ],
}

export const ES_PACKS: VocabPack[] = [
  ES_PACK_BASICS,
  ES_PACK_FAMILY,
  ES_PACK_DESCRIBE,
  ES_PACK_FOOD,
  ES_PACK_TOWN,
  ES_PACK_DAILY,
  ES_PACK_HOUSE,
  ES_PACK_ACTIONS,
  ES_PACK_CLOTHES,
  ES_PACK_DESCRIBE2,
  ES_PACK_ROUTINE,
  ES_PACK_TRAVEL,
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
