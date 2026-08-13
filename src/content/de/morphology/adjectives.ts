import type { AdjEntry } from '../../types'

// Core German adjectives (attributive endings drilled in de-adj-endings).
export const DE_ADJS: AdjEntry[] = [
  { id: 'de/adj/gut', lang: 'de', lemma: 'gut', gloss: 'good', glossItForms: { m: 'buono', f: 'buona', mpl: 'buoni', fpl: 'buone' }, tags: ['object', 'food'], de: { comparative: 'besser' } },
  { id: 'de/adj/groß', lang: 'de', lemma: 'groß', gloss: 'big / tall', glossItForms: { m: 'grande', f: 'grande', mpl: 'grandi', fpl: 'grandi' }, tags: ['object', 'place', 'human'], de: { comparative: 'größer' } },
  { id: 'de/adj/klein', lang: 'de', lemma: 'klein', gloss: 'small', glossItForms: { m: 'piccolo', f: 'piccola', mpl: 'piccoli', fpl: 'piccole' }, tags: ['object', 'place'], de: {} },
  { id: 'de/adj/neu', lang: 'de', lemma: 'neu', gloss: 'new', glossItForms: { m: 'nuovo', f: 'nuova', mpl: 'nuovi', fpl: 'nuove' }, tags: ['object'], de: {} },
  { id: 'de/adj/alt', lang: 'de', lemma: 'alt', gloss: 'old', glossItForms: { m: 'vecchio', f: 'vecchia', mpl: 'vecchi', fpl: 'vecchie' }, tags: ['object', 'human'], de: { comparative: 'älter' } },
  { id: 'de/adj/schön', lang: 'de', lemma: 'schön', gloss: 'beautiful', glossItForms: { m: 'bello', f: 'bella', mpl: 'belli', fpl: 'belle' }, tags: ['object', 'place', 'human'], de: {} },
  { id: 'de/adj/kalt', lang: 'de', lemma: 'kalt', gloss: 'cold', glossItForms: { m: 'freddo', f: 'fredda', mpl: 'freddi', fpl: 'fredde' }, tags: ['food', 'drink', 'nature'], de: { comparative: 'kälter' } },
  { id: 'de/adj/warm', lang: 'de', lemma: 'warm', gloss: 'warm', glossItForms: { m: 'caldo', f: 'calda', mpl: 'caldi', fpl: 'calde' }, tags: ['food', 'drink', 'nature'], de: { comparative: 'wärmer' } },
  { id: 'de/adj/heiß', lang: 'de', lemma: 'heiß', gloss: 'hot', glossItForms: { m: 'caldissimo', f: 'caldissima', mpl: 'caldissimi', fpl: 'caldissime' }, tags: ['food', 'drink', 'nature'], de: {} },
  { id: 'de/adj/krank', lang: 'de', lemma: 'krank', gloss: 'sick', glossItForms: { m: 'malato', f: 'malata', mpl: 'malati', fpl: 'malate' }, tags: ['human', 'animal'], de: { comparative: 'kränker' } },
  { id: 'de/adj/gesund', lang: 'de', lemma: 'gesund', gloss: 'healthy', glossItForms: { m: 'sano', f: 'sana', mpl: 'sani', fpl: 'sane' }, tags: ['human', 'food'], de: { comparative: 'gesünder' } },
  { id: 'de/adj/stark', lang: 'de', lemma: 'stark', gloss: 'strong', glossItForms: { m: 'forte', f: 'forte', mpl: 'forti', fpl: 'forti' }, tags: ['human', 'animal'], de: { comparative: 'stärker' } },
  { id: 'de/adj/schwach', lang: 'de', lemma: 'schwach', gloss: 'weak', glossItForms: { m: 'debole', f: 'debole', mpl: 'deboli', fpl: 'deboli' }, tags: ['human', 'animal'], de: { comparative: 'schwächer' } },
  { id: 'de/adj/reich', lang: 'de', lemma: 'reich', gloss: 'rich', glossItForms: { m: 'ricco', f: 'ricca', mpl: 'ricchi', fpl: 'ricche' }, tags: ['human'], de: {} },
  { id: 'de/adj/arm', lang: 'de', lemma: 'arm', gloss: 'poor', glossItForms: { m: 'povero', f: 'povera', mpl: 'poveri', fpl: 'povere' }, tags: ['human'], de: { comparative: 'ärmer' } },
  { id: 'de/adj/sauber', lang: 'de', lemma: 'sauber', gloss: 'clean', glossItForms: { m: 'pulito', f: 'pulita', mpl: 'puliti', fpl: 'pulite' }, tags: ['object', 'place'], de: {} },
  { id: 'de/adj/schmutzig', lang: 'de', lemma: 'schmutzig', gloss: 'dirty', glossItForms: { m: 'sporco', f: 'sporca', mpl: 'sporchi', fpl: 'sporche' }, tags: ['object', 'place', 'clothing'], de: {} },
  { id: 'de/adj/voll', lang: 'de', lemma: 'voll', gloss: 'full', glossItForms: { m: 'pieno', f: 'piena', mpl: 'pieni', fpl: 'piene' }, tags: ['object', 'place'], de: {} },
  { id: 'de/adj/leer', lang: 'de', lemma: 'leer', gloss: 'empty', glossItForms: { m: 'vuoto', f: 'vuota', mpl: 'vuoti', fpl: 'vuote' }, tags: ['object', 'place'], de: {} },
  { id: 'de/adj/offen', lang: 'de', lemma: 'offen', gloss: 'open', glossItForms: { m: 'aperto', f: 'aperta', mpl: 'aperti', fpl: 'aperte' }, tags: ['object', 'place'], de: {} },
  { id: 'de/adj/geschlossen', lang: 'de', lemma: 'geschlossen', gloss: 'closed', glossItForms: { m: 'chiuso', f: 'chiusa', mpl: 'chiusi', fpl: 'chiuse' }, tags: ['object', 'place'], de: {} },
  { id: 'de/adj/ruhig', lang: 'de', lemma: 'ruhig', gloss: 'calm / quiet', glossItForms: { m: 'tranquillo', f: 'tranquilla', mpl: 'tranquilli', fpl: 'tranquille' }, tags: ['human', 'place'], de: {} },
  { id: 'de/adj/nervös', lang: 'de', lemma: 'nervös', gloss: 'nervous', glossItForms: { m: 'nervoso', f: 'nervosa', mpl: 'nervosi', fpl: 'nervose' }, tags: ['human'], de: {} },
  { id: 'de/adj/traurig', lang: 'de', lemma: 'traurig', gloss: 'sad', glossItForms: { m: 'triste', f: 'triste', mpl: 'tristi', fpl: 'tristi' }, tags: ['human'], de: {} },
  { id: 'de/adj/glücklich', lang: 'de', lemma: 'glücklich', gloss: 'happy', glossItForms: { m: 'felice', f: 'felice', mpl: 'felici', fpl: 'felici' }, tags: ['human'], de: {} },
  { id: 'de/adj/ernst', lang: 'de', lemma: 'ernst', gloss: 'serious', glossItForms: { m: 'serio', f: 'seria', mpl: 'seri', fpl: 'serie' }, tags: ['human'], de: {} },
  { id: 'de/adj/nett', lang: 'de', lemma: 'nett', gloss: 'nice / kind', glossItForms: { m: 'gentile', f: 'gentile', mpl: 'gentili', fpl: 'gentili' }, tags: ['human'], de: {} },
  { id: 'de/adj/gefährlich', lang: 'de', lemma: 'gefährlich', gloss: 'dangerous', glossItForms: { m: 'pericoloso', f: 'pericolosa', mpl: 'pericolosi', fpl: 'pericolose' }, tags: ['animal', 'place', 'object'], de: {} },
  { id: 'de/adj/sicher', lang: 'de', lemma: 'sicher', gloss: 'safe', glossItForms: { m: 'sicuro', f: 'sicura', mpl: 'sicuri', fpl: 'sicure' }, tags: ['place', 'object'], de: {} },
  { id: 'de/adj/frei', lang: 'de', lemma: 'frei', gloss: 'free', glossItForms: { m: 'libero', f: 'libera', mpl: 'liberi', fpl: 'libere' }, tags: ['human', 'object', 'place'], de: {} },
  { id: 'de/adj/müde', lang: 'de', lemma: 'müde', gloss: 'tired', glossItForms: { m: 'stanco', f: 'stanca', mpl: 'stanchi', fpl: 'stanche' }, tags: ['human'], de: {} },
]

export const DE_ADJ_BY_ID = new Map(DE_ADJS.map((a) => [a.id, a]))
