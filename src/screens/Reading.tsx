import { useState } from 'react'
import { Link, useLocation, useParams } from 'wouter'
import { ArrowLeft, BookOpen } from 'lucide-react'
import type { ExerciseOption } from '../content/types'
import { loc } from '../content/types'
import { readingById } from '../content/registry'
import { finishSession } from '../data/progress'
import { useT } from '../i18n/ui'
import { useSettings } from '../store/settings'
import SpeakButton from '../components/SpeakButton'

type Phase = 'text' | 'questions' | 'done'

export default function Reading() {
  const params = useParams<{ id: string }>()
  const [, navigate] = useLocation()
  const t = useT()
  const primary = useSettings((s) => s.primary)
  const passage = readingById(params.id)

  const [phase, setPhase] = useState<Phase>('text')
  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [firstTry, setFirstTry] = useState(0)
  const [earnedXp, setEarnedXp] = useState(0)

  if (!passage) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6">
        <p className="text-slate-500">{t('topicNotFound')}</p>
        <Link href="/" className="mt-4 font-semibold text-indigo-600">
          {t('backHome')}
        </Link>
      </div>
    )
  }

  const question = passage.questions[qIndex]

  function choose(opt: ExerciseOption) {
    if (chosen) return
    setChosen(opt.text)
    if (!opt.strategy) setFirstTry((n) => n + 1)
  }

  function nextQuestion() {
    setChosen(null)
    if (qIndex + 1 >= passage!.questions.length) {
      void finishSession({
        lessonId: `${passage!.id}/l1`,
        firstTryCorrect: firstTry,
        total: passage!.questions.length,
        isReview: false,
      }).then(({ xp }) => {
        setEarnedXp(xp)
        setPhase('done')
      })
    } else {
      setQIndex(qIndex + 1)
    }
  }

  if (phase === 'done') {
    const pct = Math.round((firstTry / passage.questions.length) * 100)
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 pt-safe pb-safe">
        <p className="text-6xl">{pct >= 80 ? '🎉' : '📖'}</p>
        <h1 className="mt-4 text-2xl font-bold">{t('readingComplete')}</h1>
        <p className="mt-2 text-slate-500">
          {t('firstTryScore', { n: firstTry, total: passage.questions.length, pct })}
        </p>
        <p className="mt-1 font-semibold text-amber-600">+{earnedXp} XP</p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow"
        >
          {t('continue')}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-4 pt-safe">
      <header className="flex items-center gap-2 py-3">
        <Link href="/" aria-label={t('back')} className="p-2 text-slate-400">
          <ArrowLeft size={22} />
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold">{passage.title}</h1>
          <p className="truncate text-xs text-slate-500">{loc(passage.blurb, primary)}</p>
        </div>
        <div className="ml-auto">
          <SpeakButton text={passage.text.replace(/\n+/g, ' ')} lang={passage.lang} />
        </div>
      </header>

      {phase === 'text' && (
        <main className="flex-1 pb-32">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {passage.text.split(/\n\s*\n/).map((para, i) => (
              <p key={i} className="mb-3 leading-relaxed last:mb-0">
                {para}
              </p>
            ))}
          </div>

          {passage.glossary.length > 0 && (
            <>
              <h2 className="mt-5 mb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                {t('glossaryTitle')}
              </h2>
              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
                {passage.glossary.map(([word, meaning]) => (
                  <div key={word} className="flex justify-between gap-3 px-4 py-2 text-sm">
                    <span className="font-semibold text-indigo-800">{word}</span>
                    <span className="text-right text-slate-500">{loc(meaning, primary)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-slate-50 via-slate-50 pb-safe">
            <div className="mx-auto max-w-lg px-4 py-4">
              <button
                onClick={() => setPhase('questions')}
                className="w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow"
              >
                {t('answerQuestions')}
              </button>
            </div>
          </div>
        </main>
      )}

      {phase === 'questions' && question && (
        <main className="flex-1 pb-40">
          <p className="mt-2 text-xs font-medium text-slate-400">
            {t('questionOf', { n: qIndex + 1, total: passage.questions.length })}
          </p>
          <p className="mt-3 text-xl font-semibold leading-snug">{question.prompt}</p>

          <div className="mt-6 space-y-3">
            {question.options.map((opt) => {
              const showState = chosen !== null
              const isChosen = chosen === opt.text
              const style = !showState
                ? 'border-slate-200 bg-white active:bg-slate-100'
                : !opt.strategy
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : isChosen
                    ? 'border-rose-400 bg-rose-50 text-rose-700'
                    : 'border-slate-200 bg-white opacity-50'
              return (
                <button
                  key={opt.text}
                  onClick={() => choose(opt)}
                  className={`block w-full rounded-2xl border-2 px-4 py-3.5 text-left font-semibold shadow-sm transition ${style}`}
                >
                  {opt.text}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => {
              setPhase('text')
              setChosen(null)
            }}
            className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-indigo-600"
          >
            <BookOpen size={16} /> {t('backToText')}
          </button>

          {chosen && (
            <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-slate-50 via-slate-50 pb-safe">
              <div className="mx-auto max-w-lg px-4 py-4">
                <button
                  onClick={nextQuestion}
                  className="w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow"
                >
                  {t('continue')}
                </button>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  )
}
