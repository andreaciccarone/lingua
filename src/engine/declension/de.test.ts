import { describe, expect, it } from 'vitest'
import { declineDe } from './de'
import { DE_NOUN_BY_ID } from '../../content/de/morphology/nouns'

const n = (id: string) => DE_NOUN_BY_ID.get(`de/noun/${id}`)!

describe('definite articles', () => {
  it('nominative: der/die/das/die', () => {
    expect(declineDe(n('mann'), { case: 'nom', det: 'def', number: 'sg' })).toEqual({ article: 'der', noun: 'Mann' })
    expect(declineDe(n('frau'), { case: 'nom', det: 'def', number: 'sg' })).toEqual({ article: 'die', noun: 'Frau' })
    expect(declineDe(n('kind'), { case: 'nom', det: 'def', number: 'sg' })).toEqual({ article: 'das', noun: 'Kind' })
    expect(declineDe(n('kind'), { case: 'nom', det: 'def', number: 'pl' })).toEqual({ article: 'die', noun: 'Kinder' })
  })

  it('accusative: only masculine changes (der -> den)', () => {
    expect(declineDe(n('mann'), { case: 'acc', det: 'def', number: 'sg' }).article).toBe('den')
    expect(declineDe(n('frau'), { case: 'acc', det: 'def', number: 'sg' }).article).toBe('die')
    expect(declineDe(n('kind'), { case: 'acc', det: 'def', number: 'sg' }).article).toBe('das')
  })

  it('dative: dem/der/dem/den', () => {
    expect(declineDe(n('mann'), { case: 'dat', det: 'def', number: 'sg' }).article).toBe('dem')
    expect(declineDe(n('frau'), { case: 'dat', det: 'def', number: 'sg' }).article).toBe('der')
    expect(declineDe(n('kind'), { case: 'dat', det: 'def', number: 'sg' }).article).toBe('dem')
  })
})

describe('ein-words', () => {
  it('ein/eine/ein and einen in the accusative', () => {
    expect(declineDe(n('mann'), { case: 'nom', det: 'indef', number: 'sg' }).article).toBe('ein')
    expect(declineDe(n('frau'), { case: 'nom', det: 'indef', number: 'sg' }).article).toBe('eine')
    expect(declineDe(n('mann'), { case: 'acc', det: 'indef', number: 'sg' }).article).toBe('einen')
    expect(declineDe(n('buch'), { case: 'acc', det: 'indef', number: 'sg' }).article).toBe('ein')
  })

  it('kein declines like ein but has a plural', () => {
    expect(declineDe(n('buch'), { case: 'acc', det: 'kein', number: 'pl' }).article).toBe('keine')
    expect(declineDe(n('mann'), { case: 'dat', det: 'kein', number: 'sg' }).article).toBe('keinem')
  })

  it('possessives take ein-endings; euer contracts', () => {
    expect(declineDe(n('haus'), { case: 'nom', det: 'poss', number: 'sg', possessor: '1sg' }).article).toBe('mein')
    expect(declineDe(n('tür'), { case: 'acc', det: 'poss', number: 'sg', possessor: '2sg' }).article).toBe('deine')
    expect(
      declineDe(n('frau'), { case: 'nom', det: 'poss', number: 'sg', possessor: '3sg', possessorFeminine: true }).article,
    ).toBe('ihre')
    expect(declineDe(n('haus'), { case: 'nom', det: 'poss', number: 'sg', possessor: '2pl' }).article).toBe('euer')
    expect(declineDe(n('tür'), { case: 'nom', det: 'poss', number: 'sg', possessor: '2pl' }).article).toBe('eure')
  })
})

describe('noun form changes', () => {
  it('n-declension: der Student, den Studenten', () => {
    expect(declineDe(n('student'), { case: 'nom', det: 'def', number: 'sg' }).noun).toBe('Student')
    expect(declineDe(n('student'), { case: 'acc', det: 'def', number: 'sg' }).noun).toBe('Studenten')
    expect(declineDe(n('student'), { case: 'dat', det: 'def', number: 'sg' }).noun).toBe('Studenten')
  })

  it('dative plural adds -n: mit den Kindern, but not on -n/-s plurals', () => {
    expect(declineDe(n('kind'), { case: 'dat', det: 'def', number: 'pl' })).toEqual({ article: 'den', noun: 'Kindern' })
    expect(declineDe(n('frau'), { case: 'dat', det: 'def', number: 'pl' }).noun).toBe('Frauen')
    expect(declineDe(n('kaffee'), { case: 'dat', det: 'def', number: 'pl' }).noun).toBe('Kaffees')
  })
})
