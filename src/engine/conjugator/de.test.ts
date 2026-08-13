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

  it('no e-insertion after double m/n or vowel+n: kommst, wohnst', () => {
    expect(conjugateDe(v('kommen'), 'pres', '2sg').form).toBe('kommst')
    expect(conjugateDe(v('kommen'), 'pres', '3sg').form).toBe('kommt')
    expect(conjugateDe(v('wohnen'), 'pres', '2sg').form).toBe('wohnst')
    expect(conjugateDe(v('lernen'), 'pres', '3sg').form).toBe('lernt')
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

describe('Präteritum (sein/haben only)', () => {
  it('war and hatte', () => {
    expect(conjugateDe(v('sein'), 'praet', '1sg').form).toBe('war')
    expect(conjugateDe(v('sein'), 'praet', '2sg').form).toBe('warst')
    expect(conjugateDe(v('sein'), 'praet', '1pl').form).toBe('waren')
    expect(conjugateDe(v('haben'), 'praet', '3sg').form).toBe('hatte')
    expect(conjugateDe(v('haben'), 'praet', '2pl').form).toBe('hattet')
  })

  it('throws for verbs without stored forms', () => {
    expect(() => conjugateDe(v('machen'), 'praet', '1sg')).toThrow()
  })
})

describe('modal verbs', () => {
  it('singular is irregular, plural regular', () => {
    expect(paradigmDe(v('können'), 'pres')).toEqual({
      '1sg': 'kann',
      '2sg': 'kannst',
      '3sg': 'kann',
      '1pl': 'können',
      '2pl': 'könnt',
      '3pl': 'können',
    })
    expect(conjugateDe(v('müssen'), 'pres', '3sg').form).toBe('muss')
    expect(conjugateDe(v('wollen'), 'pres', '1sg').form).toBe('will')
    expect(conjugateDe(v('dürfen'), 'pres', '2sg').form).toBe('darfst')
    expect(conjugateDe(v('sollen'), 'pres', '2sg').form).toBe('sollst')
    expect(conjugateDe(v('sollen'), 'pres', '3sg').form).toBe('soll')
    expect(conjugateDe(v('möchten'), 'pres', '3sg').form).toBe('möchte')
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
