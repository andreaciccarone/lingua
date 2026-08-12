import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { getVoices, isTTSSupported, speak } from '../audio/tts'
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

  const { dailyGoalXp, foldDiacritics, ttsRate, ttsVoiceURI, listeningEnabled, update } =
    useSettings()
  const [esVoiceList, setEsVoiceList] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (isTTSSupported()) getVoices('es').then(setEsVoiceList)
  }, [])

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

      <h2 className="mb-2 text-sm font-semibold text-slate-500">Audio</h2>
      <div className="mb-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {esVoiceList.length > 0 ? (
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="shrink-0 text-sm">Spanish voice</span>
            <div className="flex min-w-0 items-center gap-1">
              <select
                value={ttsVoiceURI.es ?? esVoiceList[0]?.voiceURI}
                onChange={(e) => update({ ttsVoiceURI: { ...ttsVoiceURI, es: e.target.value } })}
                className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-sm"
              >
                {esVoiceList.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
              <button
                aria-label="Test voice"
                onClick={() =>
                  speak('Hola, ¿cómo estás?', { lang: 'es', rate: ttsRate, voiceURI: ttsVoiceURI.es })
                }
                className="shrink-0 rounded-full p-2 text-indigo-500 active:bg-indigo-50"
              >
                <Volume2 size={18} />
              </button>
            </div>
          </div>
        ) : (
          <p className="px-4 py-3 text-sm text-slate-400">
            No Spanish voice installed. On iPhone: Settings → Accessibility → Spoken Content →
            Voices.
          </p>
        )}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm">Speech speed</span>
          <div className="flex gap-1">
            {(
              [
                [0.7, 'Slow'],
                [0.9, 'Normal'],
                [1.05, 'Fast'],
              ] as const
            ).map(([rate, label]) => (
              <button
                key={rate}
                onClick={() => update({ ttsRate: rate })}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                  Math.abs(ttsRate - rate) < 0.01
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm">Listening exercises</p>
            <p className="text-xs text-slate-400">hear a word, pick what you heard</p>
          </div>
          <button
            role="switch"
            aria-checked={listeningEnabled}
            onClick={() => update({ listeningEnabled: !listeningEnabled })}
            className={`h-7 w-12 rounded-full p-1 transition ${
              listeningEnabled ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-white shadow transition ${
                listeningEnabled ? 'translate-x-5' : ''
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
