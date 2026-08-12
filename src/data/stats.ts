import { addDays, daysBetween } from '../lib/dates'
import type { DayRecord } from './db'

export interface StreakInfo {
  current: number
  freezesLeft: number
  /** true if today's goal is already met */
  todayDone: boolean
}

/**
 * Walk the day records chronologically. A day counts when xp >= goal.
 * Every 10 consecutive days earns one streak freeze (bank max 2); a missed
 * day consumes a freeze instead of breaking the streak. Today, while still
 * incomplete, never breaks the streak.
 */
export function computeStreak(days: DayRecord[], today: string, goal: number): StreakInfo {
  const met = new Set(days.filter((d) => d.xp >= goal).map((d) => d.date))
  if (met.size === 0) return { current: 0, freezesLeft: 0, todayDone: false }

  const first = [...met].sort()[0]
  let streak = 0
  let freezes = 0
  let earnedAt = 0 // streak length at which the last freeze was earned

  for (let date = first; date <= today; date = addDays(date, 1)) {
    if (met.has(date)) {
      streak++
      if (streak - earnedAt >= 10) {
        freezes = Math.min(2, freezes + 1)
        earnedAt = streak
      }
    } else if (date === today) {
      break // today isn't over yet
    } else if (freezes > 0) {
      freezes-- // freeze absorbs the miss; streak survives but doesn't grow
    } else {
      streak = 0
      earnedAt = 0
    }
  }
  return { current: streak, freezesLeft: freezes, todayDone: met.has(today) }
}

export function xpOn(days: DayRecord[], date: string): number {
  return days.find((d) => d.date === date)?.xp ?? 0
}

/** last n days of XP, oldest first, zero-filled */
export function xpSeries(days: DayRecord[], today: string, n: number): { date: string; xp: number }[] {
  const out = []
  for (let i = n - 1; i >= 0; i--) {
    const date = addDays(today, -i)
    out.push({ date, xp: xpOn(days, date) })
  }
  return out
}

export function daysOverdue(due: string, today: string): number {
  return due < today ? daysBetween(due, today) : 0
}
