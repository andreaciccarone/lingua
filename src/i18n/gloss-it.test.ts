import { describe, expect, it } from 'vitest'
import { conjugateIt, glossNoun, glossVerb, imperfIt, pastIt } from './gloss-it'
import type { NounEntry, VerbEntry } from '../content/types'

describe('Italian mini-conjugator', () => {
  it('regular -are/-ere/-ire', () => {
    expect(conjugateIt('parlare', '1sg')).toBe('parlo')
    expect(conjugateIt('parlare', '3sg')).toBe('parla')
    expect(conjugateIt('parlare', '1pl')).toBe('parliamo')
    expect(conjugateIt('scrivere', '2sg')).toBe('scrivi')
    expect(conjugateIt('scrivere', '3pl')).toBe('scrivono')
    expect(conjugateIt('dormire', '2pl')).toBe('dormite')
  })

  it('irregulars', () => {
    expect(conjugateIt('essere', '3sg')).toBe('è')
    expect(conjugateIt('avere', '3pl')).toBe('hanno')
    expect(conjugateIt('andare', '1sg')).toBe('vado')
    expect(conjugateIt('bere', '2sg')).toBe('bevi')
    expect(conjugateIt('fare', '1pl')).toBe('facciamo')
  })

  it('spelling rules: -care h-insertion, -giare i-drop', () => {
    expect(conjugateIt('giocare', '2sg')).toBe('giochi')
    expect(conjugateIt('giocare', '1pl')).toBe('giochiamo')
    expect(conjugateIt('mangiare', '2sg')).toBe('mangi')
    expect(conjugateIt('mangiare', '1pl')).toBe('mangiamo')
  })
})

const hablar: VerbEntry = {
  id: 'es/verb/hablar', lang: 'es', lemma: 'hablar',
  gloss: 'to speak', glossIt: 'parlare', gloss3sg: 'speaks', tags: [],
}
// 'speak' is in the irregular English past table -> 'spoke'

const casa: NounEntry = {
  id: 'es/noun/casa', lang: 'es', lemma: 'casa',
  gloss: 'house', glossIt: 'la casa', glossItPl: 'le case', tags: [],
  es: { gender: 'f' },
}

describe('gloss helpers', () => {
  it('verb gloss per primary language', () => {
    expect(glossVerb(hablar, '3sg', 'en')).toBe('he/she speaks')
    expect(glossVerb(hablar, '3sg', 'it')).toBe('lui/lei parla')
    expect(glossVerb(hablar, '1pl', 'it')).toBe('noi parliamo')
  })

  it('preterite glosses use the Italian passato prossimo', () => {
    expect(glossVerb(hablar, '1sg', 'it', 'pret')).toBe('io ho parlato')
    expect(glossVerb(hablar, '3pl', 'it', 'pret')).toBe('loro hanno parlato')
  })

  it('essere-verbs agree, reflexives take the clitic', () => {
    expect(pastIt('andare', '1sg')).toBe('sono andato')
    expect(pastIt('andare', '1pl')).toBe('siamo andati')
    expect(pastIt('venire', '3sg')).toBe('è venuto')
    expect(pastIt('alzarsi', '1sg')).toBe('mi sono alzato')
    expect(pastIt('alzarsi', '3pl')).toBe('si sono alzati')
  })

  it('irregular and multi-word participles', () => {
    expect(pastIt('fare', '1sg')).toBe('ho fatto')
    expect(pastIt('vedere', '2sg')).toBe('hai visto')
    expect(pastIt('dire', '3sg')).toBe('ha detto')
    expect(pastIt('leggere', '1pl')).toBe('abbiamo letto')
    expect(pastIt('fare la spesa', '1sg')).toBe('ho fatto la spesa')
    expect(pastIt('mangiare', '2pl')).toBe('avete mangiato')
    expect(pastIt('dormire', '3pl')).toBe('hanno dormito')
  })

  it('English past falls back to simple past', () => {
    expect(glossVerb(hablar, '1sg', 'en', 'pret')).toBe('I spoke')
  })

  it('noun gloss: definite, indefinite, partitive plural', () => {
    expect(glossNoun(casa, { def: true, number: 'sg' }, 'en')).toBe('the house')
    expect(glossNoun(casa, { def: true, number: 'sg' }, 'it')).toBe('la casa')
    expect(glossNoun(casa, { def: false, number: 'sg' }, 'it')).toBe('una casa')
    expect(glossNoun(casa, { def: true, number: 'pl' }, 'it')).toBe('le case')
    expect(glossNoun(casa, { def: false, number: 'pl' }, 'it')).toBe('delle case')
  })

  it('falls back to English when glossIt is missing', () => {
    const bare: VerbEntry = { ...hablar, glossIt: undefined }
    expect(glossVerb(bare, '3sg', 'it')).toBe('he/she speaks')
  })
})

describe('imperfetto', () => {
  it('regular and irregular stems', () => {
    expect(imperfIt('parlare', '1sg')).toBe('parlavo')
    expect(imperfIt('parlare', '1pl')).toBe('parlavamo')
    expect(imperfIt('leggere', '3sg')).toBe('leggeva')
    expect(imperfIt('dormire', '3pl')).toBe('dormivano')
    expect(imperfIt('essere', '3sg')).toBe('era')
    expect(imperfIt('fare', '1pl')).toBe('facevamo')
    expect(imperfIt('bere', '2sg')).toBe('bevevi')
    expect(imperfIt('alzarsi', '1sg')).toBe('mi alzavo')
  })

  it('glossVerb impf renders imperfetto / used to', () => {
    expect(glossVerb(hablar, '3sg', 'it', 'impf')).toBe('lui/lei parlava')
    expect(glossVerb(hablar, '1sg', 'en', 'impf')).toBe('I used to speak')
  })
})
