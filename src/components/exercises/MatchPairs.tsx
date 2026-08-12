import { useMemo, useState } from 'react'
import type { ExerciseInstance } from '../../content/types'
import { hashSeed, mulberry32, shuffled } from '../../engine/exercises'

interface Props {
  exercise: ExerciseInstance
  /** called once when the board is cleared; wrong = number of mismatch taps */
  onComplete: (wrongTaps: number) => void
}

export default function MatchPairs({ exercise, onComplete }: Props) {
  const pairs = exercise.pairs ?? []
  const rights = useMemo(
    () => shuffled(pairs.map((p) => p[1]), mulberry32(hashSeed(pairs.map((p) => p[0]).join()))),
    [pairs],
  )
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [solved, setSolved] = useState<Set<string>>(new Set())
  const [wrongTaps, setWrongTaps] = useState(0)
  const [shake, setShake] = useState<string | null>(null)

  function tapRight(form: string) {
    if (!selectedLeft || solved.has(form)) return
    const match = pairs.find(([l]) => l === selectedLeft)
    if (match && match[1] === form) {
      const next = new Set(solved).add(form)
      setSolved(next)
      setSelectedLeft(null)
      if (next.size === pairs.length) onComplete(wrongTaps)
    } else {
      setWrongTaps((w) => w + 1)
      setShake(form)
      setTimeout(() => setShake(null), 350)
    }
  }

  const solvedLeft = new Set(pairs.filter(([, r]) => solved.has(r)).map(([l]) => l))

  return (
    <div>
      <p className="mt-6 text-center text-lg font-semibold">{exercise.gloss}</p>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {pairs.map(([left]) => (
            <button
              key={left}
              onClick={() => !solvedLeft.has(left) && setSelectedLeft(left)}
              disabled={solvedLeft.has(left)}
              className={`w-full rounded-2xl border-2 px-3 py-3 text-lg font-semibold shadow-sm transition ${
                solvedLeft.has(left)
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-300'
                  : selectedLeft === left
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white'
              }`}
            >
              {left}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {rights.map((form) => (
            <button
              key={form}
              onClick={() => tapRight(form)}
              disabled={solved.has(form)}
              className={`w-full rounded-2xl border-2 px-3 py-3 text-lg font-semibold shadow-sm transition ${
                solved.has(form)
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-300'
                  : shake === form
                    ? 'animate-pulse border-rose-400 bg-rose-50 text-rose-700'
                    : 'border-slate-200 bg-white'
              }`}
            >
              {form}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
