import { useRef, useState } from 'react'
import type { ExerciseInstance } from '../../content/types'
import { grade } from '../../engine/grading'
import type { GradeResult } from '../../engine/grading'
import { useSettings } from '../../store/settings'
import { Sentence } from './MultipleChoice'

interface Props {
  exercise: ExerciseInstance
  onAnswer: (correct: boolean, result: GradeResult, typed: string) => void
  disabled: boolean
}

const ACCENTS: Record<string, string[]> = {
  es: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'],
  de: ['ä', 'ö', 'ü', 'ß'],
}

export default function Cloze({ exercise, onAnswer, disabled }: Props) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const foldDiacritics = useSettings((s) => s.foldDiacritics)

  function submit() {
    if (disabled || submitted || !value.trim()) return
    setSubmitted(true)
    const result = grade(value, [exercise.answer, ...exercise.accepted], {
      lang: exercise.lang,
      strictSuffixLen: exercise.strictSuffixLen,
      foldDiacritics,
    })
    onAnswer(result.correct, result, value)
  }

  function insertChar(ch: string) {
    const el = inputRef.current
    if (!el || submitted) return
    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? value.length
    const next = value.slice(0, start) + ch + value.slice(end)
    setValue(next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + 1, start + 1)
    })
  }

  return (
    <div>
      <Sentence exercise={exercise} filled={submitted ? value : null} />
      <div className="mt-8">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          disabled={submitted}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="done"
          placeholder="Type the missing word"
          className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-4 text-center text-xl font-semibold outline-none focus:border-indigo-400"
        />
        <div className="mt-3 flex justify-center gap-2">
          {ACCENTS[exercise.lang].map((ch) => (
            <button
              key={ch}
              onClick={() => insertChar(ch)}
              className="h-10 w-10 rounded-lg border border-slate-200 bg-white text-lg font-semibold text-slate-700 shadow-sm active:bg-slate-100"
            >
              {ch}
            </button>
          ))}
        </div>
        {!submitted && (
          <button
            onClick={submit}
            disabled={!value.trim()}
            className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow disabled:opacity-40"
          >
            Check
          </button>
        )}
      </div>
    </div>
  )
}
