import { Link, useParams } from 'wouter'
import { ArrowLeft } from 'lucide-react'
import { ES_TOPIC_BY_ID } from '../content/es'
import Explanation from '../components/Explanation'

export default function TopicIntro() {
  const params = useParams<{ id: string }>()
  const topic = ES_TOPIC_BY_ID.get(params.id)

  if (!topic) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6">
        <p className="text-slate-500">Topic not found.</p>
        <Link href="/" className="mt-4 font-semibold text-indigo-600">
          Back home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-4 pt-safe">
      <header className="flex items-center gap-2 py-3">
        <Link href="/" aria-label="Back" className="p-2 text-slate-400">
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{topic.title}</h1>
          <p className="text-xs text-slate-500">{topic.ruleSummary}</p>
        </div>
      </header>

      <main className="flex-1 pb-32">
        <Explanation blocks={topic.explanation} />
      </main>

      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-slate-50 via-slate-50 pb-safe">
        <div className="mx-auto max-w-lg px-4 py-4">
          <Link
            href={`/lesson/topic:${topic.id}`}
            className="block w-full rounded-2xl bg-indigo-600 py-4 text-center text-lg font-bold text-white shadow"
          >
            Start lesson
          </Link>
        </div>
      </div>
    </div>
  )
}
