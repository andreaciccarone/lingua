import { describe, expect, it } from 'vitest'
import { genAdjEndingDrill, genCaseArticleDrill, genConjugationDrillDe, genPerfectDrill, genPluralDrillDe } from './exercises-de'
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

describe('perfect drill', () => {
  const essen = DE_VERB_BY_ID.get('de/verb/essen')!
  const kommen = DE_VERB_BY_ID.get('de/verb/kommen')!
  const aux = {
    haben: DE_VERB_BY_ID.get('de/verb/haben')!,
    sein: DE_VERB_BY_ID.get('de/verb/sein')!,
  }

  it('aux mode: haben-verb offers sein as wrongAux distractor', () => {
    const strategies = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const ex = genPerfectDrill(essen, {
        mode: 'aux', person: '1sg', topicId: 't', cellId: 'aux', auxVerbs: aux, seed: `s${i}`, primary: 'en',
      })
      expect(ex.answer).toBe('habe')
      expect(ex.sentence).toEqual(['Ich', '___', 'gegessen'])
      for (const o of ex.options!) if (o.strategy) strategies.add(o.strategy)
    }
    expect(strategies.has('wrongAux')).toBe(true)
  })

  it('sein-verb: er ist gekommen', () => {
    const ex = genPerfectDrill(kommen, {
      mode: 'aux', person: '3sg', topicId: 't', cellId: 'aux', auxVerbs: aux, seed: 's', primary: 'en',
    })
    expect(ex.answer).toBe('ist')
    expect(ex.sentence[2]).toBe('gekommen')
  })

  it('participle mode is a cloze on the participle', () => {
    const ex = genPerfectDrill(essen, {
      mode: 'participle', person: '1pl', topicId: 't', cellId: 'part', auxVerbs: aux, seed: 's', primary: 'it',
    })
    expect(ex.type).toBe('cloze')
    expect(ex.answer).toBe('gegessen')
    expect(ex.sentence).toEqual(['Wir', 'haben', '___', '(essen)'])
    expect(ex.gloss).toBe('noi abbiamo mangiato')
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

describe('adjective endings', () => {
  const gut = { id: 'de/adj/gut', lang: 'de' as const, lemma: 'gut', gloss: 'good', glossItForms: { m: 'buono', f: 'buona', mpl: 'buoni', fpl: 'buone' }, tags: [], de: {} }

  it('mixed declension: ein guter Mann, ein gutes Kind', () => {
    const m = genAdjEndingDrill(gut, mann, {
      case: 'nom', det: 'indef', topicId: 't', cellId: 'nom', seed: 's', primary: 'en',
    })
    expect(m.answer).toBe('guter')
    expect(m.sentence).toEqual(['Das', 'ist', 'ein', '___', 'Mann'])
    const kind = DE_NOUN_BY_ID.get('de/noun/kind')!
    const n = genAdjEndingDrill(gut, kind, {
      case: 'nom', det: 'indef', topicId: 't', cellId: 'nom', seed: 's', primary: 'en',
    })
    expect(n.answer).toBe('gutes')
  })

  it('weak declension: der gute Mann, den guten Mann', () => {
    const nom = genAdjEndingDrill(gut, mann, {
      case: 'nom', det: 'def', topicId: 't', cellId: 'nom', seed: 's', primary: 'en',
    })
    expect(nom.answer).toBe('gute')
    const acc = genAdjEndingDrill(gut, mann, {
      case: 'acc', det: 'def', topicId: 't', cellId: 'acc', seed: 's', primary: 'en',
    })
    expect(acc.answer).toBe('guten')
    expect(acc.sentence).toEqual(['Ich', 'sehe', 'den', '___', 'Mann'])
  })

  it('Italian gloss agrees with the Italian noun', () => {
    const frau = DE_NOUN_BY_ID.get('de/noun/frau')!
    const ex = genAdjEndingDrill(gut, frau, {
      case: 'nom', det: 'def', topicId: 't', cellId: 'nom', seed: 's', primary: 'it',
    })
    expect(ex.gloss).toBe('la donna buona')
  })
})
