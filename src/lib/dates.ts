/** Local-timezone date strings ('YYYY-MM-DD'). All streak/due math compares
 *  these strings — never UTC epochs — so midnight and DST behave as the user expects. */

export function todayLocal(now: Date = new Date()): string {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number)
  const dt = new Date(y, m - 1, d + days, 12) // noon avoids DST edge cases
  return todayLocal(dt)
}

/** date strings compare correctly as strings; helper for readability */
export function isDue(due: string, today: string): boolean {
  return due <= today
}

export function daysBetween(a: string, b: string): number {
  const [ya, ma, da] = a.split('-').map(Number)
  const [yb, mb, db] = b.split('-').map(Number)
  const ms = new Date(yb, mb - 1, db, 12).getTime() - new Date(ya, ma - 1, da, 12).getTime()
  return Math.round(ms / 86_400_000)
}
