import { useEffect, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { getVoices, isTTSSupported, speak } from '../audio/tts'
import { exportBackup, importBackup, resetAllProgress } from '../data/backup'
import { isStandalone } from '../lib/platform'
import { useSettings } from '../store/settings'
import { useT } from '../i18n/ui'

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

  return <SettingsView diag={diag} />
}

function SettingsView({ diag }: { diag: Diag | null }) {
  const tRows = useT()
  const rows: [string, string][] = diag
    ? [
        [tRows('installed'), diag.standalone ? tRows('yes') : tRows('installedNo')],
        [tRows('offlineCache'), diag.serviceWorker ? tRows('active') : tRows('notActiveYet')],
        [
          tRows('storageProtected'),
          diag.persisted === null ? tRows('unknown') : diag.persisted ? tRows('yes') : tRows('notYet'),
        ],
        [tRows('spanishVoices'), String(diag.esVoices)],
        [tRows('germanVoices'), String(diag.deVoices)],
      ]
    : []

  const { dailyGoalXp, foldDiacritics, ttsRate, ttsVoiceURI, listeningEnabled, primary, update } =
    useSettings()
  const t = useT()
  const [esVoiceList, setEsVoiceList] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (isTTSSupported()) getVoices('es').then(setEsVoiceList)
  }, [])

  return (
    <div className="pt-4">
      <h1 className="mb-6 text-2xl font-bold">{t('settings')}</h1>

      <h2 className="mb-2 text-sm font-semibold text-slate-500">{t('appLanguage')}</h2>
      <div className="mb-6 flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        {(
          [
            ['it', '🇮🇹 Italiano'],
            ['en', '🇬🇧 English'],
          ] as const
        ).map(([lang, label]) => (
          <button
            key={lang}
            onClick={() => update({ primary: lang })}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
              primary === lang ? 'bg-indigo-600 text-white shadow' : 'text-slate-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <h2 className="mb-2 text-sm font-semibold text-slate-500">{t('learning')}</h2>
      <div className="mb-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm">{t('dailyGoal')}</span>
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
            <p className="text-sm">{t('forgiveAccents')}</p>
            <p className="text-xs text-slate-400">{t('forgiveAccentsHint')}</p>
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

      <h2 className="mb-2 text-sm font-semibold text-slate-500">{t('audio')}</h2>
      <div className="mb-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {esVoiceList.length > 0 ? (
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="shrink-0 text-sm">{t('spanishVoice')}</span>
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
          <p className="px-4 py-3 text-sm text-slate-400">{t('noVoice')}</p>
        )}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm">{t('speechSpeed')}</span>
          <div className="flex gap-1">
            {(
              [
                [0.7, t('slow')],
                [0.9, t('normal')],
                [1.05, t('fast')],
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
            <p className="text-sm">{t('listeningExercises')}</p>
            <p className="text-xs text-slate-400">{t('listeningHint')}</p>
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

      <h2 className="mb-2 text-sm font-semibold text-slate-500">{t('deviceCheck')}</h2>
      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">{label}</span>
            <span className="text-sm font-semibold text-slate-600">{value}</span>
          </div>
        ))}
      </div>

      <DataSection />

      <p className="mt-6 text-center text-xs text-slate-400">Lingua v0.1.0</p>
    </div>
  )
}

function DataSection() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)
  const t = useT()

  async function handleImport(file: File) {
    try {
      const result = await importBackup(await file.text())
      setMessage(t('restored', { cards: result.cards, days: result.days }))
      setTimeout(() => window.location.reload(), 1200)
    } catch (e) {
      setMessage(e instanceof Error ? e.message : t('importFailed'))
    }
  }

  async function handleReset() {
    if (!window.confirm(t('resetConfirm'))) return
    await resetAllProgress()
    window.location.reload()
  }

  return (
    <>
      <h2 className="mt-6 mb-2 text-sm font-semibold text-slate-500">{t('yourData')}</h2>
      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <button
          onClick={() => void exportBackup()}
          className="block w-full px-4 py-3 text-left text-sm font-semibold text-indigo-600"
        >
          {t('exportBackup')}
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="block w-full px-4 py-3 text-left text-sm font-semibold text-indigo-600"
        >
          {t('importBackup')}
        </button>
        <button
          onClick={() => void handleReset()}
          className="block w-full px-4 py-3 text-left text-sm font-semibold text-rose-600"
        >
          {t('resetProgress')}
        </button>
        {message && <p className="px-4 py-3 text-sm text-slate-500">{message}</p>}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) void handleImport(f)
          e.target.value = ''
        }}
      />
      <p className="mt-2 px-1 text-xs text-slate-400">{t('backupHint')}</p>
    </>
  )
}
