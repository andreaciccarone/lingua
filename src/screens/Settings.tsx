import { useEffect, useState } from 'react'
import { isStandalone } from '../lib/platform'
import { useSettings } from '../store/settings'

interface Diag {
  standalone: boolean
  serviceWorker: boolean
  persisted: boolean | null
  esVoices: number
  deVoices: number
}

export default function Settings() {
  const [diag, setDiag] = useState<Diag | null>(null)

  useEffect(() => {
    async function collect() {
      const persisted = navigator.storage?.persisted ? await navigator.storage.persisted() : null
      const sw = !!navigator.serviceWorker?.controller
      const voices = window.speechSynthesis?.getVoices() ?? []
      setDiag({
        standalone: isStandalone(),
        serviceWorker: sw,
        persisted,
        esVoices: voices.filter((v) => v.lang.startsWith('es')).length,
        deVoices: voices.filter((v) => v.lang.startsWith('de')).length,
      })
    }
    collect()
    window.speechSynthesis?.addEventListener('voiceschanged', collect)
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', collect)
  }, [])

  const rows: [string, string][] = diag
    ? [
        ['Installed (standalone)', diag.standalone ? 'Yes' : 'No — running in browser'],
        ['Offline cache (service worker)', diag.serviceWorker ? 'Active' : 'Not active yet'],
        [
          'Storage protected',
          diag.persisted === null ? 'Unknown' : diag.persisted ? 'Yes' : 'Not yet',
        ],
        ['Spanish voices', String(diag.esVoices)],
        ['German voices', String(diag.deVoices)],
      ]
    : []

  const { dailyGoalXp, foldDiacritics, update } = useSettings()

  return (
    <div className="pt-4">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      <h2 className="mb-2 text-sm font-semibold text-slate-500">Learning</h2>
      <div className="mb-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm">Daily goal</span>
          <div className="flex gap-1">
            {[30, 50, 80].map((g) => (
              <button
                key={g}
                onClick={() => update({ dailyGoalXp: g })}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                  dailyGoalXp === g ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm">Forgive missing accents</p>
            <p className="text-xs text-slate-400">habló = hablo, with a reminder</p>
          </div>
          <button
            role="switch"
            aria-checked={foldDiacritics}
            onClick={() => update({ foldDiacritics: !foldDiacritics })}
            className={`h-7 w-12 rounded-full p-1 transition ${
              foldDiacritics ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-white shadow transition ${
                foldDiacritics ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <h2 className="mb-2 text-sm font-semibold text-slate-500">Device check</h2>
      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">{label}</span>
            <span className="text-sm font-semibold text-slate-600">{value}</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">Lingua v0.1.0</p>
    </div>
  )
}
