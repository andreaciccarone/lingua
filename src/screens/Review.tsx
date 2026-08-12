import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { BookA, RotateCcw, SquareStack } from 'lucide-react'
import { getDueCards } from '../data/db'
import { todayLocal } from '../lib/dates'
import { useSettings } from '../store/settings'
import { useT } from '../i18n/ui'

export default function Review() {
  const [counts, setCounts] = useState<{ skills: number; vocab: number } | null>(null)
  const { activeLang, loaded } = useSettings()
  const t = useT()

  useEffect(() => {
    if (!loaded) return
    getDueCards(activeLang, todayLocal()).then((due) =>
      setCounts({
        skills: due.filter((c) => c.kind === 'skill').length,
        vocab: due.filter((c) => c.kind === 'vocab').length,
      }),
    )
  }, [activeLang, loaded])

  const total = (counts?.skills ?? 0) + (counts?.vocab ?? 0)
  const minutes = Math.max(1, Math.round((counts?.skills ?? 0) * 0.4 + (counts?.vocab ?? 0) * 0.15))

  return (
    <div className="pt-4">
      <h1 className="mb-6 text-2xl font-bold">{t('review')}</h1>

      {counts === null ? (
        <p className="text-slate-400">{t('loading')}</p>
      ) : total === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <RotateCcw size={32} className="text-slate-300" />
          <p className="font-semibold">{t('nothingDue')}</p>
          <p className="text-sm text-slate-500">{t('nothingDueBody')}</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex justify-around text-center">
            <div>
              <SquareStack size={20} className="mx-auto text-indigo-500" />
              <p className="mt-1 text-2xl font-bold">{counts.skills}</p>
              <p className="text-xs text-slate-500">{t('grammarSkills')}</p>
            </div>
            <div>
              <BookA size={20} className="mx-auto text-emerald-500" />
              <p className="mt-1 text-2xl font-bold">{counts.vocab}</p>
              <p className="text-xs text-slate-500">{t('wordsDue')}</p>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">≈ {minutes} {t('minutes')}</p>
          <Link
            href="/lesson/review"
            className="mt-4 block w-full rounded-2xl bg-indigo-600 py-4 text-center text-lg font-bold text-white shadow"
          >
            {t('startReview')}
          </Link>
        </div>
      )}
    </div>
  )
}
