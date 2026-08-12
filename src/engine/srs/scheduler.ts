import { addDays } from '../../lib/dates'

/** SM-2 mechanics with grades derived automatically from answer results —
 *  the app knows whether you were right, so there are no self-grade buttons. */

export type Grade = 'again' | 'hard' | 'good' | 'easy'
export type Stage = 'new' | 'learning' | 'review' | 'relearning'

export interface SrsState {
  stage: Stage
  /** progress through in-session learning steps */
  stepIndex: number
  intervalDays: number
  ease: number
  due: string // 'YYYY-MM-DD' local
  reps: number
  lapses: number
}

export const EASE_START = 2.3
const EASE_MIN = 1.3
const EASE_MAX = 3.0
const INTERVAL_CAP_DAYS = 180
/** correct answers needed in-session before a new card graduates to review */
const LEARNING_STEPS = 2

export function initialSrs(today: string): SrsState {
  return { stage: 'new', stepIndex: 0, intervalDays: 0, ease: EASE_START, due: today, reps: 0, lapses: 0 }
}

export interface ApplyOptions {
  today: string
  /** optional fuzz source in [0,1); omitted = no fuzz (tests) */
  rand?: () => number
}

function clampEase(e: number): number {
  return Math.min(EASE_MAX, Math.max(EASE_MIN, e))
}

function withFuzz(days: number, rand?: () => number): number {
  if (!rand || days < 3) return days
  const f = 1 + (rand() * 0.2 - 0.1) // ±10%
  return Math.max(1, Math.round(days * f))
}

function schedule(s: SrsState, days: number, opts: ApplyOptions): SrsState {
  const interval = Math.min(INTERVAL_CAP_DAYS, Math.max(1, Math.round(days)))
  const fuzzed = withFuzz(interval, opts.rand)
  return { ...s, intervalDays: fuzzed, due: addDays(opts.today, fuzzed) }
}

export function applyGrade(prev: SrsState, grade: Grade, opts: ApplyOptions): SrsState {
  const s: SrsState = { ...prev, reps: prev.reps + 1 }

  if (s.stage === 'new' || s.stage === 'learning') {
    if (grade === 'again') return { ...s, stage: 'learning', stepIndex: 0 }
    if (grade === 'hard') return { ...s, stage: 'learning' } // repeat the step
    const step = s.stepIndex + 1
    if (step < LEARNING_STEPS) return { ...s, stage: 'learning', stepIndex: step }
    // graduate
    return schedule(
      { ...s, stage: 'review', stepIndex: 0 },
      grade === 'easy' ? 2 : 1,
      opts,
    )
  }

  if (s.stage === 'relearning') {
    if (grade === 'again') return { ...s, stepIndex: 0 }
    // one correct answer returns a lapsed card to review at its reduced interval
    return schedule({ ...s, stage: 'review' }, s.intervalDays, opts)
  }

  // review
  switch (grade) {
    case 'again': {
      const reduced = Math.max(1, Math.round(s.intervalDays * 0.3))
      return {
        ...s,
        stage: 'relearning',
        stepIndex: 0,
        lapses: s.lapses + 1,
        ease: clampEase(s.ease - 0.2),
        intervalDays: reduced,
        due: opts.today, // relearn now
      }
    }
    case 'hard':
      return schedule({ ...s, ease: clampEase(s.ease - 0.15) }, s.intervalDays * 1.2, opts)
    case 'good':
      return schedule(s, s.intervalDays * s.ease, opts)
    case 'easy':
      return schedule({ ...s, ease: clampEase(s.ease + 0.05) }, s.intervalDays * s.ease * 1.3, opts)
  }
}

export interface AnswerResult {
  /** correct on the first attempt */
  firstTry: boolean
  /** correct on the second attempt (firstTry false); both false = revealed/failed */
  secondTry: boolean
  ms?: number
  /** user's median answer time for this exercise type, when known */
  medianMs?: number
}

export function deriveGrade(r: AnswerResult): Grade {
  if (!r.firstTry && !r.secondTry) return 'again'
  if (!r.firstTry) return 'hard'
  if (r.ms !== undefined && r.medianMs !== undefined) {
    if (r.ms < 0.6 * r.medianMs) return 'easy'
    if (r.ms > 2.5 * r.medianMs) return 'hard'
  }
  return 'good'
}

/** 0..1 strength used for mastery bars: log-scaled interval with overdue decay */
export function skillStrength(s: SrsState, today: string, daysOverdue: number): number {
  if (s.stage === 'new') return 0
  if (s.stage !== 'review') return Math.min(0.2, s.reps * 0.05)
  void today
  const base = Math.min(1, Math.log2(s.intervalDays + 1) / Math.log2(91))
  return base * Math.pow(0.95, Math.max(0, daysOverdue))
}
