import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'wouter'
import { X } from 'lucide-react'
import type { ExerciseOption } from '../content/types'
import type { GradeResult } from '../engine/grading'
import { buildSession, metaForSkill, type SessionSpec } from '../engine/session'
import { finishSession, recordAnswer } from '../data/progress'
import MultipleChoice from '../components/exercises/MultipleChoice'
import Cloze from '../components/exercises/Cloze'
import MatchPairs from '../components/exercises/MatchPairs'
import Flashcard from '../components/exercises/Flashcard'
import SpeakButton from '../components/SpeakButton'

interface Feedback {
  correct: boolean
  message?: string
}

export default function Lesson() {
  const params = useParams<{ id: string }>()
  const [, navigate] = useLocation()
  const [spec, setSpec] = useState<SessionSpec | null>(null)
  const [missing, setMissing] = useState(false)
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [firstTryCorrect, setFirstTryCorrect] = useState(0)
  const [earnedXp, setEarnedXp] = useState<number | null>(null)
  const [finishing, setFinishing] = useState(false)
  const startedAt = useRef(Date.now())

  useEffect(() => {
    let cancelled = false
    buildSession(params.id).then((s) => {
      if (cancelled) return
      if (!s || s.exercises.length === 0) setMissing(true)
      else setSpec(s)
    })
    return () => {
      cancelled = true
    }
  }, [params.id])

  const exercise = spec?.exercises[index]
  useMemo(() => {
    startedAt.current = Date.now()
  }, [index])

  function record(correct: boolean) {
    if (!exercise) return
    const primary = exercise.skillIds[0]
    if (!primary) return
    void recordAnswer(primary, metaForSkill(primary), {
      firstTry: correct,
      secondTry: false,
      ms: Date.now() - startedAt.current,
    })
  }

  function handleAnswer(correct: boolean, option?: ExerciseOption, gradeResult?: GradeResult) {
    if (!spec || !exercise) return
    record(correct)
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
      const hint = option?.strategy ? spec.hints[option.strategy] : undefined
      setFeedback({ correct: false, message: `${exercise.answer}${hint ? ` — ${hint}` : ''}` })
    }
  }

  function handleMatchComplete(wrongTaps: number) {
    if (!exercise) return
    // every pair in the board shares the outcome; misses make it a 'hard' review
    for (const skillId of exercise.skillIds) {
      void recordAnswer(skillId, metaForSkill(skillId), {
        firstTry: wrongTaps === 0,
        secondTry: wrongTaps > 0,
      })
    }
    if (wrongTaps === 0) setFirstTryCorrect((n) => n + 1)
    setFeedback({
      correct: wrongTaps === 0,
      message: wrongTaps ? 'Cleared with some misses.' : undefined,
    })
  }

  function handleFlashcardDone() {
    if (!exercise) return
    record(true)
    next()
  }

  function next() {
    if (!spec) return
    setFeedback(null)
    if (index + 1 >= spec.exercises.length) {
      setFinishing(true)
      void finishSession({
        lessonId: spec.lessonId,
        firstTryCorrect,
        total: spec.exercises.length,
        isReview: spec.isReview,
      }).then(({ xp }) => setEarnedXp(xp))
    } else {
      setIndex(index + 1)
    }
  }

  if (missing) {
    return (
      <Empty
        title="Nothing here"
        body="This session is empty — nothing is due right now."
        onDone={() => navigate('/')}
      />
    )
  }

  if (!spec || !exercise || (finishing && earnedXp === null)) {
    return <div className="flex min-h-dvh items-center justify-center text-slate-400">Loading…</div>
  }

  if (earnedXp !== null) {
    const pct = Math.round((firstTryCorrect / spec.exercises.length) * 100)
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 pt-safe pb-safe">
        <p className="text-6xl">{pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📖'}</p>
        <h1 className="mt-4 text-2xl font-bold">
          {spec.isReview ? 'Review complete' : 'Lesson complete'}
        </h1>
        <p className="mt-2 text-slate-500">
          {firstTryCorrect} of {spec.exercises.length} right on the first try ({pct}%)
        </p>
        <p className="mt-1 font-semibold text-amber-600">+{earnedXp} XP</p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow"
        >
          Continue
        </button>
      </div>
    )
  }

  const progress = (index / spec.exercises.length) * 100

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
        {exercise.type === 'flashcard' ? (
          <Flashcard key={index} exercise={exercise} onComplete={handleFlashcardDone} />
        ) : exercise.type === 'match' ? (
          <MatchPairs key={index} exercise={exercise} onComplete={handleMatchComplete} />
        ) : exercise.type === 'mc' || exercise.type === 'listen-cloze' ? (
          <div key={index}>
            {exercise.type === 'listen-cloze' && exercise.ttsText && (
              <div className="mt-10 flex justify-center rounded-2xl border border-indigo-100 bg-indigo-50 py-6">
                <SpeakButton text={exercise.ttsText} lang={exercise.lang} size={36} autoPlay />
              </div>
            )}
            <MultipleChoice
              exercise={exercise}
              disabled={!!feedback}
              onAnswer={(correct, option) => handleAnswer(correct, option)}
            />
          </div>
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
            <div className="flex items-center justify-between">
              <p className={`font-bold ${feedback.correct ? 'text-emerald-800' : 'text-rose-800'}`}>
                {feedback.correct ? 'Correct!' : 'Not quite.'}
              </p>
              {exercise.ttsText && exercise.type !== 'listen-cloze' && (
                <SpeakButton text={exercise.ttsText} lang={exercise.lang} size={18} autoPlay />
              )}
            </div>
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

function Empty({ title, body, onDone }: { title: string; body: string; onDone: () => void }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="mt-2 text-center text-slate-500">{body}</p>
      <button
        onClick={onDone}
        className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow"
      >
        Back
      </button>
    </div>
  )
}
