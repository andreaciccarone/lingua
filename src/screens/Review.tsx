import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { BookA, RotateCcw, SquareStack } from 'lucide-react'
import { getDueCards } from '../data/db'
import { todayLocal } from '../lib/dates'
import { useSettings } from '../store/settings'

export default function Review() {
  const [counts, setCounts] = useState<{ skills: number; vocab: number } | null>(null)
  const { activeLang, loaded } = useSettings()

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
      <h1 className="mb-6 text-2xl font-bold">Review</h1>

      {counts === null ? (
        <p className="text-slate-400">Loading…</p>
      ) : total === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <RotateCcw size={32} className="text-slate-300" />
          <p className="font-semibold">Nothing due</p>
          <p className="text-sm text-slate-500">
            Grammar skills and words you practice come back here at growing intervals. Do a lesson
            to get started.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex justify-around text-center">
            <div>
              <SquareStack size={20} className="mx-auto text-indigo-500" />
              <p className="mt-1 text-2xl font-bold">{counts.skills}</p>
              <p className="text-xs text-slate-500">grammar skills</p>
            </div>
            <div>
              <BookA size={20} className="mx-auto text-emerald-500" />
              <p className="mt-1 text-2xl font-bold">{counts.vocab}</p>
              <p className="text-xs text-slate-500">words</p>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">≈ {minutes} min</p>
          <Link
            href="/lesson/review"
            className="mt-4 block w-full rounded-2xl bg-indigo-600 py-4 text-center text-lg font-bold text-white shadow"
          >
            Start review
          </Link>
        </div>
      )}
    </div>
  )
}
