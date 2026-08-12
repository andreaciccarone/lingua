import { describe, expect, it } from 'vitest'
import { conjugateDe, paradigmDe, perfectDe } from './de'
import { DE_VERB_BY_ID } from '../../content/de/morphology/verbs'

function v(id: string) {
  const verb = DE_VERB_BY_ID.get(`de/verb/${id}`)
  if (!verb) throw new Error(`missing verb ${id}`)
  return verb
}

describe('regular present', () => {
  it('machen', () => {
    expect(paradigmDe(v('machen'), 'pres')).toEqual({
      '1sg': 'mache',
      '2sg': 'machst',
      '3sg': 'macht',
      '1pl': 'machen',
      '2pl': 'macht',
      '3pl': 'machen',
    })
  })
})

describe('irregulars', () => {
  it('sein is fully suppletive', () => {
    expect(paradigmDe(v('sein'), 'pres')).toEqual({
      '1sg': 'bin',
      '2sg': 'bist',
      '3sg': 'ist',
      '1pl': 'sind',
      '2pl': 'seid',
      '3pl': 'sind',
    })
  })

  it('haben mixes overrides (hast/hat) with regular cells', () => {
    expect(paradigmDe(v('haben'), 'pres')).toEqual({
      '1sg': 'habe',
      '2sg': 'hast',
      '3sg': 'hat',
      '1pl': 'haben',
      '2pl': 'habt',
      '3pl': 'haben',
    })
  })
})

describe('spelling rules', () => {
  it('e-insertion: arbeiten -> du arbeitest, er arbeitet, ihr arbeitet', () => {
    expect(conjugateDe(v('arbeiten'), 'pres', '2sg').form).toBe('arbeitest')
    expect(conjugateDe(v('arbeiten'), 'pres', '3sg').form).toBe('arbeitet')
    expect(conjugateDe(v('arbeiten'), 'pres', '2pl').form).toBe('arbeitet')
    expect(conjugateDe(v('arbeiten'), 'pres', '1sg').form).toBe('arbeite')
  })

  it('s-merge: heißen -> du heißt (not *heißst)', () => {
    expect(conjugateDe(v('heißen'), 'pres', '2sg').form).toBe('heißt')
    expect(conjugateDe(v('heißen'), 'pres', '3sg').form).toBe('heißt')
  })
})

describe('strong-verb vowel change (du/er only)', () => {
  it('fahren -> fährst/fährt but wir fahren', () => {
    expect(conjugateDe(v('fahren'), 'pres', '2sg').form).toBe('fährst')
    expect(conjugateDe(v('fahren'), 'pres', '3sg').form).toBe('fährt')
    expect(conjugateDe(v('fahren'), 'pres', '1pl').form).toBe('fahren')
    expect(conjugateDe(v('fahren'), 'pres', '1sg').form).toBe('fahre')
  })

  it('essen -> isst/isst', () => {
    expect(conjugateDe(v('essen'), 'pres', '2sg').form).toBe('isst')
    expect(conjugateDe(v('essen'), 'pres', '3sg').form).toBe('isst')
  })
})

describe('separable verbs', () => {
  it('aufstehen -> stehe + auf prefix', () => {
    const c = conjugateDe(v('aufstehen'), 'pres', '1sg')
    expect(c.form).toBe('stehe')
    expect(c.prefix).toBe('auf')
  })
})

describe('perfect', () => {
  const aux = { haben: v('haben'), sein: v('sein') }

  it('haben-verbs: ich habe gemacht', () => {
    expect(perfectDe(v('machen'), '1sg', aux)).toEqual({ aux: 'habe', participle: 'gemacht' })
  })

  it('sein-verbs: er ist gekommen', () => {
    expect(perfectDe(v('kommen'), '3sg', aux)).toEqual({ aux: 'ist', participle: 'gekommen' })
  })
})
