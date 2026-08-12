import { describe, expect, it } from 'vitest'
import { genConjugationDrill, genMatchDrill } from './exercises'
import { ES_VERB_BY_ID } from '../content/es/morphology/verbs'
import { PERSONS } from '../content/types'

const querer = ES_VERB_BY_ID.get('es/verb/querer')!
const ser = ES_VERB_BY_ID.get('es/verb/ser')!

describe('conjugation drill generator', () => {
  it('is deterministic for the same seed', () => {
    const a = genConjugationDrill({
      verb: querer, tense: 'pres', person: '2sg', topicId: 't', type: 'mc', primary: 'en', seed: 'x',
    })
    const b = genConjugationDrill({
      verb: querer, tense: 'pres', person: '2sg', topicId: 't', type: 'mc', primary: 'en', seed: 'x',
    })
    expect(a).toEqual(b)
  })

  it('mc options are unique, include the answer, and carry strategies on wrong ones', () => {
    for (const person of PERSONS) {
      const ex = genConjugationDrill({
        verb: querer, tense: 'pres', person, topicId: 't', type: 'mc', primary: 'en', seed: `s/${person}`,
      })
      const texts = ex.options!.map((o) => o.text)
      expect(new Set(texts).size).toBe(texts.length)
      const correct = ex.options!.filter((o) => !o.strategy)
      expect(correct).toHaveLength(1)
      expect(correct[0].text).toBe(ex.answer)
      expect(ex.options!.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('stem-change corruptions appear as distractors', () => {
    // deterministically scan seeds until the strategy shows up in the bank
    const strategies = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const ex = genConjugationDrill({
        verb: querer, tense: 'pres', person: '1pl', topicId: 't', type: 'mc', primary: 'en', seed: `s${i}`,
      })
      for (const o of ex.options!) if (o.strategy) strategies.add(o.strategy)
    }
    expect(strategies.has('overStemChange')).toBe(true)
  })

  it('cloze marks the grammatical suffix as strict', () => {
    const ex = genConjugationDrill({
      verb: querer, tense: 'pres', person: '2sg', topicId: 't', type: 'cloze', primary: 'en', seed: 's',
    })
    expect(ex.answer).toBe('quieres')
    expect(ex.strictSuffixLen).toBe(2) // -es
  })

  it('assigns the person-cell skill id', () => {
    const ex = genConjugationDrill({
      verb: ser, tense: 'pres', person: '3pl', topicId: 'es-ser-present', type: 'mc', primary: 'en', seed: 's',
    })
    expect(ex.skillIds[0]).toBe('es-ser-present:3pl')
  })
})

describe('match drill generator', () => {
  it('produces unambiguous pairs', () => {
    const ex = genMatchDrill({ verb: ser, tense: 'pres', topicId: 't', seed: 's', primary: 'en' })
    const forms = ex.pairs!.map(([, f]) => f)
    expect(new Set(forms).size).toBe(forms.length)
    expect(ex.pairs!.length).toBeGreaterThanOrEqual(4)
  })
})
