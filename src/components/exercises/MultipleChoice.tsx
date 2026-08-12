import { useState } from 'react'
import type { ExerciseInstance, ExerciseOption } from '../../content/types'

interface Props {
  exercise: ExerciseInstance
  onAnswer: (correct: boolean, option?: ExerciseOption) => void
  disabled: boolean
}

export default function MultipleChoice({ exercise, onAnswer, disabled }: Props) {
  const [chosen, setChosen] = useState<string | null>(null)

  function choose(opt: ExerciseOption) {
    if (disabled || chosen) return
    setChosen(opt.text)
    onAnswer(!opt.strategy, opt)
  }

  return (
    <div>
      <Sentence exercise={exercise} filled={chosen} />
      <div className="mt-8 grid grid-cols-2 gap-3">
        {exercise.options?.map((opt) => {
          const isChosen = chosen === opt.text
          const showState = chosen !== null
          const style = !showState
            ? 'border-slate-200 bg-white active:bg-slate-100'
            : isChosen && !opt.strategy
              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
              : isChosen
                ? 'border-rose-400 bg-rose-50 text-rose-700'
                : !opt.strategy
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-white opacity-50'
          return (
            <button
              key={opt.text}
              onClick={() => choose(opt)}
              className={`rounded-2xl border-2 px-4 py-4 text-lg font-semibold shadow-sm transition ${style}`}
            >
              {opt.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Sentence({
  exercise,
  filled,
}: {
  exercise: ExerciseInstance
  filled?: string | null
}) {
  return (
    <div className="mt-6">
      <p className="text-center text-2xl font-semibold leading-relaxed">
        {exercise.sentence.map((tok, i) =>
          i === exercise.gapIndex ? (
            <span
              key={i}
              className={`mx-1 inline-block min-w-16 border-b-2 px-1 text-center ${
                filled ? 'border-transparent text-indigo-700' : 'border-slate-300 text-transparent'
              }`}
            >
              {filled ?? '__'}
            </span>
          ) : (
            <span key={i} className="mx-1">
              {tok}
            </span>
          ),
        )}
      </p>
      <p className="mt-3 text-center text-sm text-slate-500">{exercise.gloss}</p>
    </div>
  )
}
