import { useState } from 'react'
import { Link } from 'wouter'
import { Flame, Lock } from 'lucide-react'

const UNITS: Record<'es' | 'de', string[]> = {
  es: ['Primeros pasos', 'El presente', 'Verbos con carácter', 'La gente y las cosas', 'Mi día', 'Ayer'],
  de: ['Erste Schritte', 'Sätze bauen', 'Modal & Co', 'Der Dativ', 'Vergangenheit', 'Komplexe Sätze'],
}

export default function Home() {
  const [lang, setLang] = useState<'es' | 'de'>('es')

  return (
    <div className="pt-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lingua</h1>
        <div className="flex items-center gap-1 text-orange-500">
          <Flame size={20} />
          <span className="font-semibold">0</span>
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

      {lang === 'es' && (
        <Link
          href="/lesson/vocab-basics"
          className="mb-3 flex items-center justify-between rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"
        >
          <div>
            <p className="text-xs font-medium text-emerald-500">Word pack</p>
            <p className="font-semibold">First words</p>
          </div>
          <span className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow">
            Learn words
          </span>
        </Link>
      )}

      <ol className="space-y-3">
        {UNITS[lang].map((title, i) => (
          <li
            key={title}
            className={`flex items-center justify-between rounded-2xl border p-4 ${
              i === 0 ? 'border-indigo-200 bg-white shadow-sm' : 'border-slate-200 bg-slate-100'
            }`}
          >
            <div>
              <p className="text-xs font-medium text-slate-400">Unit {i + 1}</p>
              <p className={`font-semibold ${i === 0 ? 'text-slate-900' : 'text-slate-400'}`}>
                {title}
              </p>
            </div>
            {i === 0 ? (
              lang === 'es' ? (
                <Link
                  href="/lesson/demo"
                  className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow"
                >
                  Try a lesson
                </Link>
              ) : (
                <span className="rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-white">
                  Coming soon
                </span>
              )
            ) : (
              <Lock size={18} className="text-slate-300" />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
