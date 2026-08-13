import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { BookA, BookOpen, Check, Flame, Hourglass, Lock } from 'lucide-react'
import type { Lang } from '../content/types'
import { loc } from '../content/types'
import { packsFor, readingsFor, topicById, unitsFor, upcomingUnitsFor } from '../content/registry'
import { useT } from '../i18n/ui'
import { getAllLessons, getDays } from '../data/db'
import { computeStreak, xpOn } from '../data/stats'
import { todayLocal } from '../lib/dates'
import { useSettings } from '../store/settings'

export default function Home() {
  const { activeLang, dailyGoalXp, loaded, primary, update } = useSettings()
  const t = useT()
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [streak, setStreak] = useState(0)
  const [todayXp, setTodayXp] = useState(0)

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

  const lang = loaded ? activeLang : 'es'

  const isTopicUnlocked = (topicId: string): boolean => {
    const topic = topicById(topicId)
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
        {(['es', 'de'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => update({ activeLang: l })}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
              lang === l ? 'bg-white text-indigo-700 shadow' : 'text-slate-500'
            }`}
          >
            {l === 'es' ? '🇪🇸 Español' : '🇩🇪 Deutsch'}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {unitsFor(lang).map((unit, ui) => (
          <section key={unit.id}>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              {t('unit')} {ui + 1} · {unit.title}
            </p>
            <p className="mb-3 text-sm text-slate-500">{loc(unit.blurb, primary)}</p>
            <ol className="space-y-2">
              {unit.topicIds.map((tid) => {
                const topic = topicById(tid)
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
                        {loc(topic.title, primary)}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {loc(topic.ruleSummary, primary)}
                      </p>
                    </div>
                    {done ? (
                      <Check size={18} className="shrink-0 text-emerald-500" />
                    ) : unlocked ? (
                      <span className="shrink-0 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                        {t('learnBtn')}
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
              {readingsFor(lang)
                .filter((r) => r.unitId === unit.id)
                .map((r) => {
                  const done = completed.has(r.id)
                  return (
                    <Link key={r.id} href={`/reading/${r.id}`} className="block">
                      <li
                        className={`flex items-center justify-between rounded-2xl border p-4 ${
                          done ? 'border-sky-200 bg-sky-50' : 'border-sky-200 bg-white shadow-sm'
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-2 pr-3">
                          <BookOpen size={16} className="shrink-0 text-sky-500" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-sky-500">{t('readingLabel')}</p>
                            <p className="truncate font-semibold">{r.title}</p>
                          </div>
                        </div>
                        {done ? (
                          <Check size={18} className="shrink-0 text-sky-500" />
                        ) : (
                          <span className="shrink-0 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white">
                            {t('readBtn')}
                          </span>
                        )}
                      </li>
                    </Link>
                  )
                })}
              {unit.packIds.map((pid) => {
                const pack = packsFor(lang).find((p) => p.id === pid)
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
                          <p className="text-xs font-medium text-emerald-500">{t('wordPack')}</p>
                          <p className="font-semibold">{loc(pack.title, primary)}</p>
                        </div>
                      </div>
                      {done ? (
                        <Check size={18} className="text-emerald-500" />
                      ) : (
                        <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                          {t('words')}
                        </span>
                      )}
                    </li>
                  </Link>
                )
              })}
            </ol>
          </section>
        ))}

        {upcomingUnitsFor(lang).map((unit, i) => (
          <section key={unit.title}>
            <p className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
              {t('unit')} {unitsFor(lang).length + i + 1} · {unit.title}
            </p>
            <p className="mb-3 text-sm text-slate-400">{loc(unit.blurb, primary)}</p>
            <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <span className="text-sm font-semibold text-slate-400">{t('comingSoon')}</span>
              <Hourglass size={16} className="text-slate-300" />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
