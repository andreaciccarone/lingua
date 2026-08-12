import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { Flame, Snowflake } from 'lucide-react'
import { loc, type PrimaryLang } from '../content/types'
import { topicById, unitsFor } from '../content/registry'
import { useT } from '../i18n/ui'
import { getAllCards, getDays, type CardRecord } from '../data/db'
import { computeStreak, daysOverdue, xpSeries, type StreakInfo } from '../data/stats'
import { skillStrength } from '../engine/srs/scheduler'
import { todayLocal } from '../lib/dates'
import { useSettings } from '../store/settings'

interface Weakest {
  cardId: string
  label: string
}

interface StatsData {
  streak: StreakInfo
  xp: { date: string; xp: number }[]
  wordsLearned: number
  wordsStrong: number
  topicStrength: Map<string, number>
  weakest: Weakest[]
}

function weakestSkills(cards: CardRecord[], primary: PrimaryLang): Weakest[] {
  return cards
    .filter((c) => c.kind === 'skill' && c.srs.reps >= 2)
    .sort((a, b) => b.srs.lapses - a.srs.lapses || a.srs.ease - b.srs.ease)
    .slice(0, 5)
    .filter((c) => c.srs.lapses > 0)
    .map((c) => {
      const [topicId, cellId] = c.id.split(':')
      const topic = topicById(topicId)
      const cell = topic?.skillCells.find((s) => s.cellId === cellId)
      const topicLabel = topic ? loc(topic.title, primary) : topicId
      const cellLabel = cell ? loc(cell.label, primary) : cellId
      return { cardId: c.id, label: `${topicLabel} · ${cellLabel}` }
    })
}

export default function Stats() {
  const [data, setData] = useState<StatsData | null>(null)
  const { dailyGoalXp, activeLang, loaded, primary } = useSettings()
  const t = useT()

  useEffect(() => {
    if (!loaded) return
    async function load() {
      const today = todayLocal()
      const [days, cards] = await Promise.all([getDays(), getAllCards(activeLang)])
      const vocab = cards.filter((c) => c.kind === 'vocab' && c.id.endsWith(':recog'))
      const strength = new Map<string, number>()
      for (const unit of unitsFor(activeLang)) {
        for (const topicId of unit.topicIds) {
          const topic = topicById(topicId)
          if (!topic) continue
          const topicCards = cards.filter((c) => c.kind === 'skill' && c.sourceId === topicId)
          const total = topicCards.reduce(
            (sum, c) => sum + skillStrength(c.srs, today, daysOverdue(c.srs.due, today)),
            0,
          )
          strength.set(topicId, topic.skillCells.length ? total / topic.skillCells.length : 0)
        }
      }
      setData({
        streak: computeStreak(days, today, dailyGoalXp),
        xp: xpSeries(days, today, 7),
        wordsLearned: vocab.filter((c) => c.srs.reps > 0).length,
        wordsStrong: vocab.filter((c) => c.srs.intervalDays >= 30).length,
        topicStrength: strength,
        weakest: weakestSkills(cards, primary),
      })
    }
    load()
  }, [dailyGoalXp, activeLang, loaded, primary])

  if (!data) return <p className="pt-8 text-center text-slate-400">{t('loading')}</p>

  const maxXp = Math.max(dailyGoalXp, ...data.xp.map((d) => d.xp))

  return (
    <div className="pt-4">
      <h1 className="mb-6 text-2xl font-bold">{t('stats')}</h1>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-400">{t('streak')}</p>
          <p className="flex items-center gap-1.5 text-xl font-bold">
            <Flame size={18} className="text-orange-500" />
            {data.streak.current} {data.streak.current === 1 ? t('day') : t('days')}
          </p>
          {data.streak.freezesLeft > 0 && (
            <p className="mt-1 flex items-center gap-1 text-xs text-sky-500">
              <Snowflake size={12} /> {data.streak.freezesLeft}{' '}
              {data.streak.freezesLeft > 1 ? t('freezesBanked') : t('freezeBanked')}
            </p>
          )}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-400">{t('wordsLearned')}</p>
          <p className="text-xl font-bold">{data.wordsLearned}</p>
          <p className="mt-1 text-xs text-slate-400">{data.wordsStrong} {t('at30Days')}</p>
        </div>
      </div>

      <h2 className="mt-6 mb-2 text-sm font-semibold text-slate-500">{t('xpLast7')}</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-24 items-end justify-between gap-2">
          {data.xp.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-t ${d.xp >= dailyGoalXp ? 'bg-indigo-500' : 'bg-slate-200'}`}
                style={{ height: `${Math.max(4, (d.xp / maxXp) * 88)}px` }}
              />
              <span className="text-[10px] text-slate-400">{d.date.slice(8)}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">{t('goalPerDay', { n: dailyGoalXp })}</p>
      </div>

      <h2 className="mt-6 mb-2 text-sm font-semibold text-slate-500">{t('topicMastery')}</h2>
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {unitsFor(activeLang).map((unit) => (
          <div key={unit.id}>
            <p className="mb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              {unit.title}
            </p>
            <div className="space-y-2">
              {unit.topicIds.map((tid) => {
                const topic = topicById(tid)
                const strength = data.topicStrength.get(tid) ?? 0
                if (!topic) return null
                return (
                  <div key={tid} className="flex items-center gap-2">
                    <span className="w-36 truncate text-xs text-slate-600">
                      {loc(topic.title, primary)}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          strength >= 0.8
                            ? 'bg-amber-400'
                            : strength >= 0.5
                              ? 'bg-indigo-400'
                              : 'bg-indigo-200'
                        }`}
                        style={{ width: `${Math.round(strength * 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {data.weakest.length > 0 && (
        <>
          <h2 className="mt-6 mb-2 text-sm font-semibold text-slate-500">{t('weakestSkills')}</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <ul className="space-y-1.5">
              {data.weakest.map((w) => (
                <li key={w.cardId} className="text-sm text-slate-600">
                  {w.label}
                </li>
              ))}
            </ul>
            <Link
              href="/lesson/weak"
              className="mt-3 block w-full rounded-xl bg-indigo-600 py-3 text-center font-bold text-white shadow"
            >
              {t('drillNow')}
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
