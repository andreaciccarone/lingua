import { describe, expect, it } from 'vitest'
import { genCaseArticleDrill, genConjugationDrillDe, genPluralDrillDe } from './exercises-de'
import { genWordOrder } from './exercises'
import { DE_VERB_BY_ID } from '../content/de/morphology/verbs'
import { DE_NOUN_BY_ID } from '../content/de/morphology/nouns'

const fahren = DE_VERB_BY_ID.get('de/verb/fahren')!
const mann = DE_NOUN_BY_ID.get('de/noun/mann')!
const student = DE_NOUN_BY_ID.get('de/noun/student')!

describe('German conjugation drill', () => {
  it('produces the vowel-changed form with a missingVowelChange distractor available', () => {
    const strategies = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const ex = genConjugationDrillDe({
        verb: fahren, person: '2sg', topicId: 't', type: 'mc', seed: `s${i}`, primary: 'en',
      })
      expect(ex.answer).toBe('fährst')
      for (const o of ex.options!) if (o.strategy) strategies.add(o.strategy)
    }
    expect(strategies.has('missingVowelChange')).toBe(true)
  })

  it('options are unique and include exactly one correct', () => {
    const ex = genConjugationDrillDe({
      verb: fahren, person: '3sg', topicId: 't', type: 'mc', seed: 's', primary: 'en',
    })
    const texts = ex.options!.map((o) => o.text)
    expect(new Set(texts).size).toBe(texts.length)
    expect(ex.options!.filter((o) => !o.strategy)).toHaveLength(1)
  })
})

describe('case-article drill', () => {
  it('accusative masculine: den, with case and gender distractors', () => {
    const ex = genCaseArticleDrill(mann, {
      case: 'acc',
      det: 'def',
      number: 'sg',
      topicId: 'de-nom-acc',
      cellId: 'acc.m',
      frame: { tokens: ['Ich', 'sehe', '___', '{noun}'], gloss: 'I see the {gloss}' },
      seed: 's',
      primary: 'en',
    })
    expect(ex.answer).toBe('den')
    expect(ex.sentence).toEqual(['Ich', 'sehe', '___', 'Mann'])
    expect(ex.gloss).toBe('I see the man')
    expect(ex.skillIds[0]).toBe('de-nom-acc:acc.m')
    const strategies = ex.options!.filter((o) => o.strategy).map((o) => o.strategy)
    expect(strategies.length).toBeGreaterThanOrEqual(2)
  })

  it('n-declension noun appears declined: den Studenten', () => {
    const ex = genCaseArticleDrill(student, {
      case: 'acc',
      det: 'def',
      number: 'sg',
      topicId: 't',
      cellId: 'acc.m',
      frame: { tokens: ['Ich', 'sehe', '___', '{noun}'], gloss: 'I see the {gloss}' },
      seed: 's',
      primary: 'en',
    })
    expect(ex.sentence).toContain('Studenten')
    expect(ex.answer).toBe('den')
  })
})

describe('German plural drill', () => {
  it('uses the stored plural with zero typo tolerance', () => {
    const ex = genPluralDrillDe(mann, { topicId: 't', cellId: 'pl-form', seed: 's', primary: 'en' })
    expect(ex.answer).toBe('Männer')
    expect(ex.strictSuffixLen).toBe('Männer'.length)
    expect(ex.sentence).toEqual(['der', 'Mann', '→', 'die', '___'])
  })
})

describe('word-order generator', () => {
  it('tiles contain exactly the sentence tokens; accepted includes variants', () => {
    const ex = genWordOrder(
      { answer: 'Heute trinke ich Kaffee', also: ['Ich trinke heute Kaffee'], gloss: 'Today I drink coffee', cellId: 'v2.fronted' },
      'de',
      'de-word-order-v2',
      's',
      'en',
    )
    expect([...ex.tiles!].sort()).toEqual(['Heute', 'Kaffee', 'ich', 'trinke'])
    expect(ex.accepted).toEqual(['Ich trinke heute Kaffee'])
    expect(ex.skillIds[0]).toBe('de-word-order-v2:v2.fronted')
  })
})
