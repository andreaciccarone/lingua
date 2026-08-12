import type { Lang } from '../content/types'

/** Wraps every iOS speechSynthesis quirk behind one small API:
 *  - voices load asynchronously (voiceschanged)
 *  - speaking requires a prior user gesture (prime on first tap)
 *  - the queue gets stuck paused after cancel (resume() workaround)
 */

const BCP47: Record<Lang, string[]> = {
  es: ['es-ES', 'es-MX', 'es-US'],
  de: ['de-DE', 'de-AT'],
}

/** known high-quality iOS voices, used as ranking tiebreak */
const PREFERRED_NAMES = ['Mónica', 'Paulina', 'Anna', 'Helena', 'Petra']

let primed = false
let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Call from the first user tap anywhere: satisfies iOS's gesture requirement. */
export function primeTTS(): void {
  if (primed || !isTTSSupported()) return
  primed = true
  const u = new SpeechSynthesisUtterance('')
  u.volume = 0
  window.speechSynthesis.speak(u)
}

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  voicesReady ??= new Promise((resolve) => {
    if (!isTTSSupported()) return resolve([])
    const now = window.speechSynthesis.getVoices()
    if (now.length > 0) return resolve(now)
    let done = false
    const finish = () => {
      if (done) return
      done = true
      resolve(window.speechSynthesis.getVoices())
    }
    window.speechSynthesis.addEventListener('voiceschanged', finish, { once: true })
    setTimeout(finish, 1500)
  })
  return voicesReady
}

function rank(voice: SpeechSynthesisVoice, lang: Lang): number {
  let score = 0
  if (BCP47[lang].some((tag) => voice.lang === tag || voice.lang.replace('_', '-') === tag)) score += 4
  else if (voice.lang.toLowerCase().startsWith(lang)) score += 2
  else return -1
  if (voice.localService) score += 2 // works offline — critical for a PWA
  if (PREFERRED_NAMES.some((n) => voice.name.includes(n))) score += 1
  return score
}

export async function getVoices(lang: Lang): Promise<SpeechSynthesisVoice[]> {
  const all = await loadVoices()
  return all
    .map((v) => ({ v, score: rank(v, lang) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.v)
}

export async function hasVoice(lang: Lang): Promise<boolean> {
  return (await getVoices(lang)).length > 0
}

export interface SpeakOptions {
  lang: Lang
  rate?: number
  /** persisted user choice from Settings */
  voiceURI?: string
}

export async function speak(text: string, opts: SpeakOptions): Promise<void> {
  if (!isTTSSupported() || !text) return
  const synth = window.speechSynthesis
  synth.cancel() // iOS queues get stuck; always start fresh

  const voices = await getVoices(opts.lang)
  const voice = voices.find((v) => v.voiceURI === opts.voiceURI) ?? voices[0]
  if (!voice) return

  const u = new SpeechSynthesisUtterance(text)
  u.voice = voice
  u.lang = voice.lang
  u.rate = opts.rate ?? 0.9

  synth.speak(u)
  // iOS sometimes starts paused after a cancel()
  if (synth.paused) synth.resume()
}
