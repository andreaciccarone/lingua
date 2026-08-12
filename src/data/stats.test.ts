import { describe, expect, it } from 'vitest'
import { computeStreak, xpSeries } from './stats'
import type { DayRecord } from './db'

const d = (date: string, xp: number): DayRecord => ({ date, xp, reviewsDone: 0 })
const GOAL = 50

describe('computeStreak', () => {
  it('empty history = no streak', () => {
    expect(computeStreak([], '2026-08-12', GOAL)).toEqual({
      current: 0,
      freezesLeft: 0,
      todayDone: false,
    })
  })

  it('counts consecutive goal-met days', () => {
    const days = [d('2026-08-10', 60), d('2026-08-11', 50), d('2026-08-12', 55)]
    expect(computeStreak(days, '2026-08-12', GOAL).current).toBe(3)
  })

  it('below-goal days do not count', () => {
    const days = [d('2026-08-10', 60), d('2026-08-11', 10), d('2026-08-12', 55)]
    expect(computeStreak(days, '2026-08-12', GOAL).current).toBe(1)
  })

  it('an incomplete today does not break the streak', () => {
    const days = [d('2026-08-10', 60), d('2026-08-11', 50)]
    const s = computeStreak(days, '2026-08-12', GOAL)
    expect(s.current).toBe(2)
    expect(s.todayDone).toBe(false)
  })

  it('a full missed day breaks the streak when no freeze is banked', () => {
    const days = [d('2026-08-09', 60), d('2026-08-11', 50), d('2026-08-12', 50)]
    expect(computeStreak(days, '2026-08-12', GOAL).current).toBe(2)
  })

  it('10 consecutive days earn a freeze that absorbs one miss', () => {
    const days: DayRecord[] = []
    for (let i = 1; i <= 10; i++) days.push(d(`2026-08-${String(i).padStart(2, '0')}`, 60))
    // miss the 11th, resume the 12th
    days.push(d('2026-08-12', 60))
    const s = computeStreak(days, '2026-08-12', GOAL)
    expect(s.current).toBe(11) // 10 + today-resumed day; miss was frozen
    expect(s.freezesLeft).toBe(0)
  })

  it('streak works across month boundaries', () => {
    const days = [d('2026-08-31', 60), d('2026-09-01', 60)]
    expect(computeStreak(days, '2026-09-01', GOAL).current).toBe(2)
  })
})

describe('xpSeries', () => {
  it('zero-fills missing days, oldest first', () => {
    const days = [d('2026-08-12', 30)]
    const series = xpSeries(days, '2026-08-12', 3)
    expect(series).toEqual([
      { date: '2026-08-10', xp: 0 },
      { date: '2026-08-11', xp: 0 },
      { date: '2026-08-12', xp: 30 },
    ])
  })
})
