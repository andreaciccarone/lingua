import { describe, expect, it } from 'vitest'
import { applyGrade, deriveGrade, initialSrs, skillStrength } from './scheduler'
import { addDays, daysBetween, todayLocal } from '../../lib/dates'

const T = '2026-08-12'

describe('dates', () => {
  it('adds days across month boundaries', () => {
    expect(addDays('2026-08-30', 3)).toBe('2026-09-02')
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
  })
  it('daysBetween', () => {
    expect(daysBetween('2026-08-10', '2026-08-12')).toBe(2)
    expect(daysBetween('2026-08-12', '2026-08-12')).toBe(0)
  })
  it('todayLocal formats', () => {
    expect(todayLocal(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})

describe('learning phase', () => {
  it('graduates after two correct answers, due tomorrow', () => {
    let s = initialSrs(T)
    s = applyGrade(s, 'good', { today: T })
    expect(s.stage).toBe('learning')
    s = applyGrade(s, 'good', { today: T })
    expect(s.stage).toBe('review')
    expect(s.intervalDays).toBe(1)
    expect(s.due).toBe(addDays(T, 1))
  })

  it('again resets the learning step', () => {
    let s = initialSrs(T)
    s = applyGrade(s, 'good', { today: T })
    s = applyGrade(s, 'again', { today: T })
    expect(s.stepIndex).toBe(0)
    expect(s.stage).toBe('learning')
  })
})

describe('review phase', () => {
  function reviewCard(interval: number, ease = 2.3) {
    return { stage: 'review' as const, stepIndex: 0, intervalDays: interval, ease, due: T, reps: 5, lapses: 0 }
  }

  it('good multiplies by ease', () => {
    const s = applyGrade(reviewCard(10), 'good', { today: T })
    expect(s.intervalDays).toBe(23) // 10 * 2.3
    expect(s.due).toBe(addDays(T, 23))
  })

  it('easy grows faster and bumps ease', () => {
    const s = applyGrade(reviewCard(10), 'easy', { today: T })
    expect(s.intervalDays).toBe(30) // 10 * 2.3 * 1.3 = 29.9 -> 30
    expect(s.ease).toBeCloseTo(2.35)
  })

  it('hard slows growth and drops ease', () => {
    const s = applyGrade(reviewCard(10), 'hard', { today: T })
    expect(s.intervalDays).toBe(12)
    expect(s.ease).toBeCloseTo(2.15)
  })

  it('again lapses to relearning at 30% interval, due today', () => {
    const s = applyGrade(reviewCard(20), 'again', { today: T })
    expect(s.stage).toBe('relearning')
    expect(s.lapses).toBe(1)
    expect(s.intervalDays).toBe(6)
    expect(s.due).toBe(T)
    expect(s.ease).toBeCloseTo(2.1)
  })

  it('one correct answer returns a lapsed card to review', () => {
    let s = applyGrade(reviewCard(20), 'again', { today: T })
    s = applyGrade(s, 'good', { today: T })
    expect(s.stage).toBe('review')
    expect(s.due).toBe(addDays(T, 6))
  })

  it('caps interval at 180 days and clamps ease', () => {
    const s = applyGrade(reviewCard(150, 3.0), 'easy', { today: T })
    expect(s.intervalDays).toBe(180)
    expect(s.ease).toBe(3.0)
    const hard = applyGrade(reviewCard(5, 1.3), 'again', { today: T })
    expect(hard.ease).toBe(1.3)
  })

  it('fuzz stays within ±10% and never below 1', () => {
    for (const r of [0, 0.5, 0.999]) {
      const s = applyGrade(reviewCard(10), 'good', { today: T, rand: () => r })
      expect(s.intervalDays).toBeGreaterThanOrEqual(21)
      expect(s.intervalDays).toBeLessThanOrEqual(25)
    }
  })
})

describe('grade derivation', () => {
  it('maps results to grades', () => {
    expect(deriveGrade({ firstTry: false, secondTry: false })).toBe('again')
    expect(deriveGrade({ firstTry: false, secondTry: true })).toBe('hard')
    expect(deriveGrade({ firstTry: true, secondTry: false })).toBe('good')
    expect(deriveGrade({ firstTry: true, secondTry: false, ms: 1000, medianMs: 2000 })).toBe('easy')
    expect(deriveGrade({ firstTry: true, secondTry: false, ms: 6000, medianMs: 2000 })).toBe('hard')
  })
})

describe('skill strength', () => {
  it('is 0 for new, grows with interval, decays when overdue', () => {
    expect(skillStrength(initialSrs(T), T, 0)).toBe(0)
    const month = { stage: 'review' as const, stepIndex: 0, intervalDays: 30, ease: 2.3, due: T, reps: 8, lapses: 0 }
    const fresh = skillStrength(month, T, 0)
    expect(fresh).toBeGreaterThan(0.7)
    expect(skillStrength(month, T, 10)).toBeLessThan(fresh)
  })
})
