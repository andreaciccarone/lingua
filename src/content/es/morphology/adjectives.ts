import type { AdjEntry } from '../../types'

export const ES_ADJS: AdjEntry[] = [
  { id: 'es/adj/alto', lang: 'es', lemma: 'alto', gloss: 'tall', tags: ['human'], es: {} },
  { id: 'es/adj/bajo', lang: 'es', lemma: 'bajo', gloss: 'short (height)', tags: ['human'], es: {} },
  { id: 'es/adj/nuevo', lang: 'es', lemma: 'nuevo', gloss: 'new', tags: ['object'], es: {} },
  { id: 'es/adj/viejo', lang: 'es', lemma: 'viejo', gloss: 'old', tags: ['object', 'human'], es: {} },
  { id: 'es/adj/bonito', lang: 'es', lemma: 'bonito', gloss: 'pretty', tags: ['object', 'place'], es: {} },
  { id: 'es/adj/pequeño', lang: 'es', lemma: 'pequeño', gloss: 'small', tags: ['object', 'place'], es: {} },
  { id: 'es/adj/bueno', lang: 'es', lemma: 'bueno', gloss: 'good', tags: ['object', 'food'], es: {} },
  { id: 'es/adj/malo', lang: 'es', lemma: 'malo', gloss: 'bad', tags: ['object'], es: {} },
  { id: 'es/adj/rojo', lang: 'es', lemma: 'rojo', gloss: 'red', tags: ['object'], es: {} },
  { id: 'es/adj/blanco', lang: 'es', lemma: 'blanco', gloss: 'white', tags: ['object'], es: {} },
  { id: 'es/adj/grande', lang: 'es', lemma: 'grande', gloss: 'big', tags: ['object', 'place'], es: { invariable: true } },
  { id: 'es/adj/verde', lang: 'es', lemma: 'verde', gloss: 'green', tags: ['object'], es: { invariable: true } },
  { id: 'es/adj/azul', lang: 'es', lemma: 'azul', gloss: 'blue', tags: ['object'], es: { invariable: true } },
  { id: 'es/adj/feliz', lang: 'es', lemma: 'feliz', gloss: 'happy', tags: ['human'], es: { invariable: true } },
  { id: 'es/adj/inteligente', lang: 'es', lemma: 'inteligente', gloss: 'intelligent', tags: ['human'], es: { invariable: true } },
  { id: 'es/adj/simpático', lang: 'es', lemma: 'simpático', gloss: 'nice, friendly', tags: ['human'], es: {} },
  { id: 'es/adj/cansado', lang: 'es', lemma: 'cansado', gloss: 'tired', tags: ['human'], es: {} },
  { id: 'es/adj/contento', lang: 'es', lemma: 'contento', gloss: 'glad', tags: ['human'], es: {} },
  { id: 'es/adj/enfermo', lang: 'es', lemma: 'enfermo', gloss: 'sick', tags: ['human'], es: {} },
  { id: 'es/adj/caro', lang: 'es', lemma: 'caro', gloss: 'expensive', tags: ['object'], es: {} },
  { id: 'es/adj/barato', lang: 'es', lemma: 'barato', gloss: 'cheap', tags: ['object'], es: {} },
  { id: 'es/adj/difícil', lang: 'es', lemma: 'difícil', gloss: 'difficult', tags: ['abstract'], es: { invariable: true } },
  { id: 'es/adj/fácil', lang: 'es', lemma: 'fácil', gloss: 'easy', tags: ['abstract'], es: { invariable: true } },
  { id: 'es/adj/joven', lang: 'es', lemma: 'joven', gloss: 'young', tags: ['human'], es: { invariable: true } },
  { id: 'es/adj/trabajador', lang: 'es', lemma: 'trabajador', gloss: 'hard-working', tags: ['human'], es: { formsOverride: { m: 'trabajador', f: 'trabajadora', mpl: 'trabajadores', fpl: 'trabajadoras' } } },
]

export const ES_ADJ_BY_ID = new Map(ES_ADJS.map((a) => [a.id, a]))
