import { useMemo, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { X } from 'lucide-react'
import type { DistractorStrategy, ExerciseInstance, ExerciseOption } from '../content/types'
import type { GradeResult } from '../engine/grading'
import { genConjugationDrill, genMatchDrill } from '../engine/exercises'
import { ES_VERB_BY_ID } from '../content/es/morphology/verbs'
import MultipleChoice from '../components/exercises/MultipleChoice'
import Cloze from '../components/exercises/Cloze'
import MatchPairs from '../components/exercises/MatchPairs'

// M2 demo lesson: ser + hablar present. Real lessons arrive with M4 content.
const DEMO_HINTS: Partial<Record<DistractorStrategy, string>> = {
  wrongPerson: 'The verb ending must match the person: tú → -as, él/ella → -a.',
  wrongClass: 'hablar is an -ar verb — its endings use a (-as, -a, -amos), not e.',
  infinitive: 'That is the unconjugated form. Spanish verbs always agree with their subject.',
  missingStemChange: 'This verb changes its stem vowel in this form.',
  overStemChange: 'nosotros and vosotros keep the original stem.',
}

function buildDemoLesson(): ExerciseInstance[] {
  const ser = ES_VERB_BY_ID.get('es/verb/ser')!
  const hablar = ES_VERB_BY_ID.get('es/verb/hablar')!
  const day = new Date().toISOString().slice(0, 10)
  const items: ExerciseInstance[] = [
    genMatchDrill({ verb: ser, tense: 'pres', topicId: 'es-ser-present', seed: `${day}/m1` }),
    ...(['2sg', '3sg', '1pl'] as const).map((person) =>
      genConjugationDrill({
        verb: ser, tense: 'pres', person, topicId: 'es-ser-present', type: 'mc', seed: `${day}/ser/${person}`,
      }),
    ),
    ...(['1sg', '3pl'] as const).map((person) =>
      genConjugationDrill({
        verb: ser, tense: 'pres', person, topicId: 'es-ser-present', type: 'cloze', seed: `${day}/serc/${person}`,
      }),
    ),
    genMatchDrill({ verb: hablar, tense: 'pres', topicId: 'es-present-ar', seed: `${day}/m2` }),
    ...(['3sg', '1pl'] as const).map((person) =>
      genConjugationDrill({
        verb: hablar, tense: 'pres', person, topicId: 'es-present-ar', type: 'mc', seed: `${day}/hab/${person}`,
      }),
    ),
    ...(['2sg', '3pl'] as const).map((person) =>
      genConjugationDrill({
        verb: hablar, tense: 'pres', person, topicId: 'es-present-ar', type: 'cloze', seed: `${day}/habc/${person}`,
      }),
    ),
  ]
  return items
}

interface Feedback {
  correct: boolean
  message?: string
}

export default function Lesson() {
  const [, navigate] = useLocation()
  const exercises = useMemo(buildDemoLesson, [])
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [firstTryCorrect, setFirstTryCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const exercise = exercises[index]
  const progress = (index / exercises.length) * 100

  function handleAnswer(correct: boolean, option?: ExerciseOption, gradeResult?: GradeResult) {
    if (correct) {
      setFirstTryCorrect((n) => n + 1)
      const note =
        gradeResult?.note === 'typo'
          ? 'Small typo — counted as correct.'
          : gradeResult?.note === 'accent'
            ? `Watch the accent: ${exercise.answer}`
            : gradeResult?.note === 'caps'
              ? 'German nouns are capitalized.'
              : undefined
      setFeedback({ correct: true, message: note })
    } else {
      const hint = option?.strategy ? DEMO_HINTS[option.strategy] : undefined
      setFeedback({
        correct: false,
        message: `${exercise.answer}${hint ? ` — ${hint}` : ''}`,
      })
    }
  }

  function handleMatchComplete(wrongTaps: number) {
    if (wrongTaps === 0) setFirstTryCorrect((n) => n + 1)
    setFeedback({ correct: wrongTaps === 0, message: wrongTaps ? 'Cleared with some misses.' : undefined })
  }

  function next() {
    setFeedback(null)
    if (index + 1 >= exercises.length) setDone(true)
    else setIndex(index + 1)
  }

  if (done) {
    const pct = Math.round((firstTryCorrect / exercises.length) * 100)
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 pt-safe pb-safe">
        <p className="text-6xl">{pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📖'}</p>
        <h1 className="mt-4 text-2xl font-bold">Lesson complete</h1>
        <p className="mt-2 text-slate-500">
          {firstTryCorrect} of {exercises.length} right on the first try ({pct}%)
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow"
        >
          Continue
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-4 pt-safe">
      <header className="flex items-center gap-3 pt-3">
        <Link href="/" aria-label="Quit lesson" className="p-2 text-slate-400">
          <X size={22} />
        </Link>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex-1 pb-44">
        {exercise.type === 'match' ? (
          <MatchPairs key={index} exercise={exercise} onComplete={handleMatchComplete} />
        ) : exercise.type === 'mc' ? (
          <MultipleChoice
            key={index}
            exercise={exercise}
            disabled={!!feedback}
            onAnswer={(correct, option) => handleAnswer(correct, option)}
          />
        ) : (
          <Cloze
            key={index}
            exercise={exercise}
            disabled={!!feedback}
            onAnswer={(correct, result) => handleAnswer(correct, undefined, result)}
          />
        )}
      </main>

      {feedback && (
        <div
          className={`fixed inset-x-0 bottom-0 pb-safe ${
            feedback.correct ? 'bg-emerald-100' : 'bg-rose-100'
          }`}
        >
          <div className="mx-auto max-w-lg px-4 py-4">
            <p
              className={`font-bold ${feedback.correct ? 'text-emerald-800' : 'text-rose-800'}`}
            >
              {feedback.correct ? 'Correct!' : 'Not quite.'}
            </p>
            {feedback.message && (
              <p
                className={`mt-1 text-sm ${feedback.correct ? 'text-emerald-700' : 'text-rose-700'}`}
              >
                {feedback.message}
              </p>
            )}
            <button
              onClick={next}
              className={`mt-3 w-full rounded-2xl py-3.5 text-lg font-bold text-white shadow ${
                feedback.correct ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
