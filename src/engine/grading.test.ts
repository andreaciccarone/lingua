import { describe, expect, it } from 'vitest'
import { grade, normalize } from './grading'

describe('normalize', () => {
  it('trims, collapses whitespace, strips terminal punctuation', () => {
    expect(normalize('  hola   mundo! ')).toBe('hola mundo')
    expect(normalize('¿Cómo estás?')).toBe('¿Cómo estás')
  })
})

describe('Spanish grading', () => {
  const opts = { lang: 'es' as const }

  it('accepts exact match', () => {
    expect(grade('hablas', ['hablas'], opts)).toEqual({ correct: true })
  })

  it('rejects accent difference when strict', () => {
    expect(grade('hablo', ['habló'], { ...opts, strictSuffixLen: 1 }).correct).toBe(false)
  })

  it('accepts accent difference with note when folding enabled', () => {
    expect(grade('hablo', ['habló'], { ...opts, foldDiacritics: true })).toEqual({
      correct: true,
      note: 'accent',
    })
  })

  it('never folds ñ (año ≠ ano)', () => {
    expect(grade('ano', ['año'], { ...opts, foldDiacritics: true }).correct).toBe(false)
  })

  it('tolerates one typo outside the grammatical suffix', () => {
    expect(grade('hsblamos', ['hablamos'], { ...opts, strictSuffixLen: 4 })).toEqual({
      correct: true,
      note: 'typo',
    })
  })

  it('rejects a "typo" that lands on the verb ending', () => {
    // -as vs -a is person morphology, not a typo
    expect(grade('hablas', ['habla'], { ...opts, strictSuffixLen: 2 }).correct).toBe(false)
    expect(grade('habla', ['hablas'], { ...opts, strictSuffixLen: 2 }).correct).toBe(false)
  })

  it('no typo tolerance on short words (articles)', () => {
    expect(grade('el', ['la'], opts).correct).toBe(false)
    expect(grade('los', ['las'], opts).correct).toBe(false)
  })

  it('accepts listed alternates', () => {
    expect(grade('estás', ['estás', 'está usted'], opts).correct).toBe(true)
  })
})

describe('German grading', () => {
  const opts = { lang: 'de' as const }

  it('accepts ss for ß without penalty', () => {
    expect(grade('heisst', ['heißt'], opts)).toEqual({ correct: true })
  })

  it('accepts ue/oe/ae digraphs for umlauts', () => {
    expect(grade('schoen', ['schön'], opts)).toEqual({ correct: true })
  })

  it('flags lowercase German nouns as correct-with-caps-note', () => {
    expect(grade('die tür', ['die Tür'], opts)).toEqual({ correct: true, note: 'caps' })
  })

  it('rejects wrong article even with caps folding', () => {
    expect(grade('der Tür', ['die Tür'], opts).correct).toBe(false)
  })

  it('rejects case-morpheme edits (den vs dem)', () => {
    expect(grade('den', ['dem'], opts).correct).toBe(false)
  })
})
