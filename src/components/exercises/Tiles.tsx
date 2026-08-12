import { useState } from 'react'
import type { ExerciseInstance } from '../../content/types'
import { normalize } from '../../engine/grading'

interface Props {
  exercise: ExerciseInstance
  onAnswer: (correct: boolean) => void
  disabled: boolean
}

/** word-order builder: tap tiles into a sentence, tap again to remove */
export default function Tiles({ exercise, onAnswer, disabled }: Props) {
  const tiles = exercise.tiles ?? []
  const [chosen, setChosen] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)

  const remaining = tiles.map((_, i) => i).filter((i) => !chosen.includes(i))

  function submit() {
    if (disabled || submitted || chosen.length !== tiles.length) return
    setSubmitted(true)
    const built = normalize(chosen.map((i) => tiles[i]).join(' ')).toLowerCase()
    const ok = [exercise.answer, ...exercise.accepted].some(
      (a) => normalize(a).toLowerCase() === built,
    )
    onAnswer(ok)
  }

  return (
    <div>
      <p className="mt-6 text-center text-sm text-slate-500">{exercise.gloss}</p>

      <div className="mt-6 flex min-h-14 flex-wrap items-start gap-2 border-b-2 border-slate-200 pb-3">
        {chosen.map((i, pos) => (
          <button
            key={`${i}-${pos}`}
            disabled={submitted}
            onClick={() => setChosen(chosen.filter((c) => c !== i))}
            className="rounded-xl border-2 border-indigo-200 bg-indigo-50 px-3 py-2 font-semibold text-indigo-800 shadow-sm"
          >
            {tiles[i]}
          </button>
        ))}
        {chosen.length === 0 && (
          <span className="py-2 text-sm text-slate-300">Tap the words in order…</span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {remaining.map((i) => (
          <button
            key={i}
            disabled={submitted}
            onClick={() => setChosen([...chosen, i])}
            className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 font-semibold shadow-sm active:bg-slate-100"
          >
            {tiles[i]}
          </button>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={submit}
          disabled={chosen.length !== tiles.length}
          className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow disabled:opacity-40"
        >
          Check
        </button>
      )}
    </div>
  )
}
