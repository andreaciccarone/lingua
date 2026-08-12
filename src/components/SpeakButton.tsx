import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'
import type { Lang } from '../content/types'
import { hasVoice, isTTSSupported, speak } from '../audio/tts'
import { useSettings } from '../store/settings'

interface Props {
  text: string
  lang: Lang
  size?: number
  /** speak automatically when mounted (listening exercises) */
  autoPlay?: boolean
  rateOverride?: number
}

export default function SpeakButton({ text, lang, size = 20, autoPlay, rateOverride }: Props) {
  const [available, setAvailable] = useState(false)
  const { ttsRate, ttsVoiceURI } = useSettings()

  useEffect(() => {
    let mounted = true
    if (isTTSSupported()) hasVoice(lang).then((ok) => mounted && setAvailable(ok))
    return () => {
      mounted = false
    }
  }, [lang])

  useEffect(() => {
    if (autoPlay && available) {
      void speak(text, { lang, rate: rateOverride ?? ttsRate, voiceURI: ttsVoiceURI[lang] })
    }
    // speak once per exercise mount, not on every settings change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, available, text])

  if (!available) return null

  return (
    <button
      aria-label="Listen"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void speak(text, { lang, rate: rateOverride ?? ttsRate, voiceURI: ttsVoiceURI[lang] })
      }}
      className="rounded-full p-2 text-indigo-500 active:bg-indigo-50"
    >
      <Volume2 size={size} />
    </button>
  )
}
