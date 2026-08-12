import { useEffect, useState } from 'react'
import { isStandalone } from '../lib/platform'

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

  return (
    <div className="pt-4">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

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
