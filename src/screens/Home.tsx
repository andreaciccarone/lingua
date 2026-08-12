import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { BookA, Check, Flame, Lock } from 'lucide-react'
import { ES_TOPIC_BY_ID, ES_UNITS } from '../content/es'
import { ES_PACKS } from '../content/es/packs'
import { getAllLessons, getDays } from '../data/db'
import { computeStreak, xpOn } from '../data/stats'
import { todayLocal } from '../lib/dates'
import { useSettings } from '../store/settings'

const DE_UNITS = [
  'Erste Schritte',
  'Sätze bauen',
  'Modal & Co',
  'Der Dativ',
  'Vergangenheit',
  'Komplexe Sätze',
]

export default function Home() {
  const [lang, setLang] = useState<'es' | 'de'>('es')
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [streak, setStreak] = useState(0)
  const [todayXp, setTodayXp] = useState(0)
  const dailyGoalXp = useSettings((s) => s.dailyGoalXp)

  useEffect(() => {
    getAllLessons().then((all) =>
      setCompleted(new Set(all.map((l) => l.lessonId.split('/')[0]))),
    )
    getDays().then((days) => {
      const today = todayLocal()
      setStreak(computeStreak(days, today, dailyGoalXp).current)
      setTodayXp(xpOn(days, today))
    })
  }, [dailyGoalXp])

  const isTopicUnlocked = (topicId: string): boolean => {
    const topic = ES_TOPIC_BY_ID.get(topicId)
    if (!topic) return false
    return topic.dependencies.every((dep) => completed.has(dep))
  }

  return (
    <div className="pt-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lingua</h1>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              todayXp >= dailyGoalXp ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {todayXp}/{dailyGoalXp} XP
          </span>
          <div className={`flex items-center gap-1 ${streak > 0 ? 'text-orange-500' : 'text-slate-300'}`}>
            <Flame size={20} />
            <span className="font-semibold">{streak}</span>
          </div>
        </div>
      </header>

      <div className="mb-6 flex rounded-xl bg-slate-200 p-1">
        {(['es', 'de'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
              lang === l ? 'bg-white text-indigo-700 shadow' : 'text-slate-500'
            }`}
          >
            {l === 'es' ? '🇪🇸 Español' : '🇩🇪 Deutsch'}
          </button>
        ))}
      </div>

      {lang === 'de' ? (
        <ol className="space-y-3">
          {DE_UNITS.map((title, i) => (
            <li
              key={title}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-100 p-4"
            >
              <div>
                <p className="text-xs font-medium text-slate-400">Unit {i + 1}</p>
                <p className="font-semibold text-slate-400">{title}</p>
              </div>
              <span className="text-xs font-semibold text-slate-400">Coming soon</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="space-y-8">
          {ES_UNITS.map((unit, ui) => (
            <section key={unit.id}>
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Unit {ui + 1} · {unit.title}
              </p>
              <p className="mb-3 text-sm text-slate-500">{unit.blurb}</p>
              <ol className="space-y-2">
                {unit.topicIds.map((tid) => {
                  const topic = ES_TOPIC_BY_ID.get(tid)
                  if (!topic) return null
                  const done = completed.has(tid)
                  const unlocked = isTopicUnlocked(tid)
                  const row = (
                    <li
                      className={`flex items-center justify-between rounded-2xl border p-4 ${
                        done
                          ? 'border-emerald-200 bg-emerald-50'
                          : unlocked
                            ? 'border-indigo-200 bg-white shadow-sm'
                            : 'border-slate-200 bg-slate-100'
                      }`}
                    >
                      <div className="min-w-0 pr-3">
                        <p
                          className={`truncate font-semibold ${
                            unlocked || done ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {topic.title}
                        </p>
                        <p className="truncate text-xs text-slate-400">{topic.ruleSummary}</p>
                      </div>
                      {done ? (
                        <Check size={18} className="shrink-0 text-emerald-500" />
                      ) : unlocked ? (
                        <span className="shrink-0 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                          Learn
                        </span>
                      ) : (
                        <Lock size={16} className="shrink-0 text-slate-300" />
                      )}
                    </li>
                  )
                  return unlocked || done ? (
                    <Link key={tid} href={`/topic/${tid}`} className="block">
                      {row}
                    </Link>
                  ) : (
                    <div key={tid}>{row}</div>
                  )
                })}
                {unit.packIds.map((pid) => {
                  const pack = ES_PACKS.find((p) => p.id === pid)
                  if (!pack) return null
                  const done = completed.has(pid)
                  return (
                    <Link key={pid} href={`/lesson/pack:${pid}`} className="block">
                      <li
                        className={`flex items-center justify-between rounded-2xl border p-4 ${
                          done ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-200 bg-white shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <BookA size={16} className="text-emerald-500" />
                          <div>
                            <p className="text-xs font-medium text-emerald-500">Word pack</p>
                            <p className="font-semibold">{pack.title}</p>
                          </div>
                        </div>
                        {done ? (
                          <Check size={18} className="text-emerald-500" />
                        ) : (
                          <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                            Words
                          </span>
                        )}
                      </li>
                    </Link>
                  )
                })}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
