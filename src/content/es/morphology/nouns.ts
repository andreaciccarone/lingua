import type { NounEntry } from '../../types'

// Starter nouns (M3). Grows with each unit's vocab packs.
export const ES_NOUNS: NounEntry[] = [
  { id: 'es/noun/casa', lang: 'es', lemma: 'casa', gloss: 'house', tags: ['place'], es: { gender: 'f' } },
  { id: 'es/noun/libro', lang: 'es', lemma: 'libro', gloss: 'book', tags: ['object'], es: { gender: 'm' } },
  { id: 'es/noun/agua', lang: 'es', lemma: 'agua', gloss: 'water', tags: ['drink'], es: { gender: 'f', singularArticle: 'el' } },
  { id: 'es/noun/café', lang: 'es', lemma: 'café', gloss: 'coffee', tags: ['drink'], es: { gender: 'm' } },
  { id: 'es/noun/pan', lang: 'es', lemma: 'pan', gloss: 'bread', tags: ['food'], es: { gender: 'm' } },
  { id: 'es/noun/manzana', lang: 'es', lemma: 'manzana', gloss: 'apple', tags: ['food'], es: { gender: 'f' } },
  { id: 'es/noun/mujer', lang: 'es', lemma: 'mujer', gloss: 'woman', tags: ['human'], es: { gender: 'f', pluralIrregular: 'mujeres' } },
  { id: 'es/noun/hombre', lang: 'es', lemma: 'hombre', gloss: 'man', tags: ['human'], es: { gender: 'm' } },
  { id: 'es/noun/amigo', lang: 'es', lemma: 'amigo', gloss: 'friend', tags: ['human'], es: { gender: 'm' } },
  { id: 'es/noun/ciudad', lang: 'es', lemma: 'ciudad', gloss: 'city', tags: ['place'], es: { gender: 'f', pluralIrregular: 'ciudades' } },
  { id: 'es/noun/trabajo', lang: 'es', lemma: 'trabajo', gloss: 'job', tags: ['abstract'], es: { gender: 'm' } },
  { id: 'es/noun/familia', lang: 'es', lemma: 'familia', gloss: 'family', tags: ['family'], es: { gender: 'f' } },
]

export const ES_NOUN_BY_ID = new Map(ES_NOUNS.map((n) => [n.id, n]))
