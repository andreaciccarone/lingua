import { RotateCcw } from 'lucide-react'

export default function Review() {
  return (
    <div className="pt-4">
      <h1 className="mb-6 text-2xl font-bold">Review</h1>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <RotateCcw size={32} className="text-slate-300" />
        <p className="font-semibold">Nothing due yet</p>
        <p className="text-sm text-slate-500">
          Once you start learning, grammar skills and words you've seen will come back here for
          spaced review.
        </p>
      </div>
    </div>
  )
}
