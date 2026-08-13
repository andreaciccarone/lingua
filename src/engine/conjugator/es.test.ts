import { describe, expect, it } from 'vitest'
import { conjugateEs, paradigmEs, participleEs } from './es'
import { ES_VERB_BY_ID } from '../../content/es/morphology/verbs'

function v(id: string) {
  const verb = ES_VERB_BY_ID.get(`es/verb/${id}`)
  if (!verb) throw new Error(`missing verb ${id}`)
  return verb
}

describe('regular paradigms', () => {
  it('hablar (-ar) present', () => {
    expect(paradigmEs(v('hablar'), 'pres')).toEqual({
      '1sg': 'hablo',
      '2sg': 'hablas',
      '3sg': 'habla',
      '1pl': 'hablamos',
      '2pl': 'habláis',
      '3pl': 'hablan',
    })
  })

  it('comer (-er) present', () => {
    expect(paradigmEs(v('comer'), 'pres')).toEqual({
      '1sg': 'como',
      '2sg': 'comes',
      '3sg': 'come',
      '1pl': 'comemos',
      '2pl': 'coméis',
      '3pl': 'comen',
    })
  })

  it('vivir (-ir) present', () => {
    expect(paradigmEs(v('vivir'), 'pres')).toEqual({
      '1sg': 'vivo',
      '2sg': 'vives',
      '3sg': 'vive',
      '1pl': 'vivimos',
      '2pl': 'vivís',
      '3pl': 'viven',
    })
  })

  it('hablar preterite', () => {
    expect(paradigmEs(v('hablar'), 'pret')).toEqual({
      '1sg': 'hablé',
      '2sg': 'hablaste',
      '3sg': 'habló',
      '1pl': 'hablamos',
      '2pl': 'hablasteis',
      '3pl': 'hablaron',
    })
  })

  it('comer preterite', () => {
    expect(paradigmEs(v('comer'), 'pret')).toEqual({
      '1sg': 'comí',
      '2sg': 'comiste',
      '3sg': 'comió',
      '1pl': 'comimos',
      '2pl': 'comisteis',
      '3pl': 'comieron',
    })
  })
})

describe('irregulars', () => {
  it('ser present is fully suppletive', () => {
    expect(paradigmEs(v('ser'), 'pres')).toEqual({
      '1sg': 'soy',
      '2sg': 'eres',
      '3sg': 'es',
      '1pl': 'somos',
      '2pl': 'sois',
      '3pl': 'son',
    })
  })

  it('estar mixes overrides with regular cells', () => {
    expect(paradigmEs(v('estar'), 'pres')).toEqual({
      '1sg': 'estoy',
      '2sg': 'estás',
      '3sg': 'está',
      '1pl': 'estamos', // regular cell, no override
      '2pl': 'estáis',
      '3pl': 'están',
    })
  })

  it('ir present', () => {
    expect(paradigmEs(v('ir'), 'pres')).toEqual({
      '1sg': 'voy',
      '2sg': 'vas',
      '3sg': 'va',
      '1pl': 'vamos',
      '2pl': 'vais',
      '3pl': 'van',
    })
  })

  it('ser and ir share the same preterite', () => {
    expect(paradigmEs(v('ser'), 'pret')).toEqual(paradigmEs(v('ir'), 'pret'))
    expect(conjugateEs(v('ir'), 'pret', '3sg').form).toBe('fue')
  })
})

describe('stem changes', () => {
  it('querer e>ie changes everywhere except nosotros/vosotros', () => {
    expect(paradigmEs(v('querer'), 'pres')).toEqual({
      '1sg': 'quiero',
      '2sg': 'quieres',
      '3sg': 'quiere',
      '1pl': 'queremos',
      '2pl': 'queréis',
      '3pl': 'quieren',
    })
  })

  it('poder o>ue', () => {
    expect(conjugateEs(v('poder'), 'pres', '1sg').form).toBe('puedo')
    expect(conjugateEs(v('poder'), 'pres', '1pl').form).toBe('podemos')
  })

  it('pedir e>i', () => {
    expect(conjugateEs(v('pedir'), 'pres', '3sg').form).toBe('pide')
    expect(conjugateEs(v('pedir'), 'pres', '2pl').form).toBe('pedís')
  })

  it('tener: yo-irregular beats stem change; stem change elsewhere', () => {
    expect(paradigmEs(v('tener'), 'pres')).toEqual({
      '1sg': 'tengo',
      '2sg': 'tienes',
      '3sg': 'tiene',
      '1pl': 'tenemos',
      '2pl': 'tenéis',
      '3pl': 'tienen',
    })
  })

  it('preterite spelling changes: busqué, llegué, empecé', () => {
    expect(conjugateEs(v('buscar'), 'pret', '1sg').form).toBe('busqué')
    expect(conjugateEs(v('llegar'), 'pret', '1sg').form).toBe('llegué')
    expect(conjugateEs(v('empezar'), 'pret', '1sg').form).toBe('empecé')
    expect(conjugateEs(v('buscar'), 'pret', '3sg').form).toBe('buscó')
  })

  it('preterite y-spelling: leyó, leyeron', () => {
    expect(conjugateEs(v('leer'), 'pret', '3sg').form).toBe('leyó')
    expect(conjugateEs(v('leer'), 'pret', '3pl').form).toBe('leyeron')
    expect(conjugateEs(v('leer'), 'pret', '1sg').form).toBe('leí')
  })

  it('preterite -ir stem changes: pidió, durmieron (3rd persons only)', () => {
    expect(conjugateEs(v('pedir'), 'pret', '3sg').form).toBe('pidió')
    expect(conjugateEs(v('pedir'), 'pret', '3pl').form).toBe('pidieron')
    expect(conjugateEs(v('pedir'), 'pret', '1sg').form).toBe('pedí')
    expect(conjugateEs(v('dormir'), 'pret', '3sg').form).toBe('durmió')
    expect(conjugateEs(v('dormir'), 'pret', '1pl').form).toBe('dormimos')
  })

  it('strong preterites from overrides: vine, dije/dijeron, di/dio, vi/vio', () => {
    expect(conjugateEs(v('venir'), 'pret', '1sg').form).toBe('vine')
    expect(conjugateEs(v('decir'), 'pret', '3pl').form).toBe('dijeron')
    expect(conjugateEs(v('dar'), 'pret', '3sg').form).toBe('dio')
    expect(conjugateEs(v('ver'), 'pret', '1sg').form).toBe('vi')
  })

  it('new present irregulars: vengo/vienes/venimos, veo/ves/veis, doy/dais', () => {
    expect(paradigmEs(v('venir'), 'pres')).toEqual({
      '1sg': 'vengo',
      '2sg': 'vienes',
      '3sg': 'viene',
      '1pl': 'venimos',
      '2pl': 'venís',
      '3pl': 'vienen',
    })
    expect(conjugateEs(v('ver'), 'pres', '2pl').form).toBe('veis')
    expect(conjugateEs(v('dar'), 'pres', '2pl').form).toBe('dais')
    expect(conjugateEs(v('jugar'), 'pres', '2sg').form).toBe('juegas')
    expect(conjugateEs(v('jugar'), 'pres', '1pl').form).toBe('jugamos')
  })

  it('reports applied rules for feedback', () => {
    expect(conjugateEs(v('querer'), 'pres', '2sg').appliedRules).toContain('stemChange:e>ie')
    expect(conjugateEs(v('hacer'), 'pres', '1sg').appliedRules).toContain('yoIrregular')
    expect(conjugateEs(v('hablar'), 'pres', '3pl').appliedRules).toEqual(['regular'])
  })
})

describe('imperfect', () => {
  it('regular -aba/-ía paradigms', () => {
    expect(paradigmEs(v('hablar'), 'impf')).toEqual({
      '1sg': 'hablaba', '2sg': 'hablabas', '3sg': 'hablaba',
      '1pl': 'hablábamos', '2pl': 'hablabais', '3pl': 'hablaban',
    })
    expect(conjugateEs(v('comer'), 'impf', '3sg').form).toBe('comía')
    expect(conjugateEs(v('vivir'), 'impf', '1pl').form).toBe('vivíamos')
  })

  it('no stem changes in the imperfect: quería, podía', () => {
    expect(conjugateEs(v('querer'), 'impf', '1sg').form).toBe('quería')
    expect(conjugateEs(v('poder'), 'impf', '3sg').form).toBe('podía')
  })

  it('the only three irregulars: era, iba, veía', () => {
    expect(conjugateEs(v('ser'), 'impf', '1sg').form).toBe('era')
    expect(conjugateEs(v('ir'), 'impf', '1pl').form).toBe('íbamos')
    expect(conjugateEs(v('ver'), 'impf', '2sg').form).toBe('veías')
  })
})

describe('participles', () => {
  it('regular -ado/-ido and stored irregulars', () => {
    expect(participleEs(v('hablar'))).toBe('hablado')
    expect(participleEs(v('comer'))).toBe('comido')
    expect(participleEs(v('vivir'))).toBe('vivido')
    expect(participleEs(v('hacer'))).toBe('hecho')
    expect(participleEs(v('ver'))).toBe('visto')
    expect(participleEs(v('escribir'))).toBe('escrito')
    expect(participleEs(v('volver'))).toBe('vuelto')
  })
})
