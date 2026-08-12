import { describe, expect, it } from 'vitest'
import { adjAgreeEs, articleEs, pluralEs } from './es'
import { ES_NOUN_BY_ID } from '../../content/es/morphology/nouns'
import { ES_ADJ_BY_ID } from '../../content/es/morphology/adjectives'

const n = (id: string) => ES_NOUN_BY_ID.get(`es/noun/${id}`)!
const a = (id: string) => ES_ADJ_BY_ID.get(`es/adj/${id}`)!

describe('articles', () => {
  it('agrees in gender and number', () => {
    expect(articleEs(n('casa'), true, 'sg')).toBe('la')
    expect(articleEs(n('casa'), true, 'pl')).toBe('las')
    expect(articleEs(n('libro'), false, 'sg')).toBe('un')
    expect(articleEs(n('libro'), false, 'pl')).toBe('unos')
  })
  it('el agua: stressed-a feminine takes el in the singular only', () => {
    expect(articleEs(n('agua'), true, 'sg')).toBe('el')
    expect(articleEs(n('agua'), true, 'pl')).toBe('las')
  })
})

describe('plurals', () => {
  it('vowel + s', () => expect(pluralEs(n('casa'))).toBe('casas'))
  it('consonant + es', () => expect(pluralEs(n('ciudad'))).toBe('ciudades'))
  it('café + s (accented vowel)', () => expect(pluralEs(n('café'))).toBe('cafés'))
})

describe('adjective agreement', () => {
  it('-o adjectives inflect for gender and number', () => {
    expect(adjAgreeEs(a('blanco'), 'f', 'sg')).toBe('blanca')
    expect(adjAgreeEs(a('blanco'), 'm', 'pl')).toBe('blancos')
    expect(adjAgreeEs(a('blanco'), 'f', 'pl')).toBe('blancas')
  })
  it('invariable adjectives only inflect for number', () => {
    expect(adjAgreeEs(a('grande'), 'f', 'sg')).toBe('grande')
    expect(adjAgreeEs(a('grande'), 'f', 'pl')).toBe('grandes')
    expect(adjAgreeEs(a('azul'), 'm', 'pl')).toBe('azules')
  })
  it('override forms win (trabajador/trabajadora)', () => {
    expect(adjAgreeEs(a('trabajador'), 'f', 'sg')).toBe('trabajadora')
    expect(adjAgreeEs(a('trabajador'), 'f', 'pl')).toBe('trabajadoras')
  })
})
