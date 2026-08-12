import type { Lang } from '../content/types'

export interface GradeOptions {
  lang: Lang
  /** user setting: fold accents (es: áéíóú·ü→aeiou·u; de: ae/oe/ue/ss alternates) */
  foldDiacritics?: boolean
  /** final N chars are a grammatical morpheme: no typo tolerance there */
  strictSuffixLen?: number
}

export type GradeNote = 'accent' | 'typo' | 'caps'

export interface GradeResult {
  correct: boolean
  note?: GradeNote
}

const ES_FOLD: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u' }

export function normalize(s: string): string {
  return s
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.!?¡¿،]+$/u, '')
    .trim()
}

function foldEs(s: string): string {
  // ñ is deliberately NOT folded — it is a distinct letter (año ≠ ano)
  return s.replace(/[áéíóúü]/g, (c) => ES_FOLD[c] ?? c)
}

function foldDe(s: string): string {
  // ß≡ss always; umlaut digraph spellings (ae/oe/ue) are legitimate substitutes
  return s.replace(/ß/g, 'ss').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
}

function fold(s: string, lang: Lang): string {
  return lang === 'es' ? foldEs(s) : foldDe(s)
}

/** Damerau-Levenshtein limited to answering: is distance ≤ 1, and where is the edit? */
function oneEditPosition(a: string, b: string): number | null {
  if (a === b) return null
  const la = a.length
  const lb = b.length
  if (Math.abs(la - lb) > 1) return -1 // definitely > 1 edit? not necessarily, but for len diff >1 yes

  // find first mismatch
  let i = 0
  while (i < Math.min(la, lb) && a[i] === b[i]) i++

  if (la === lb) {
    // substitution at i, or adjacent transposition at i/i+1
    if (a.slice(i + 1) === b.slice(i + 1)) return i
    if (
      i + 1 < la &&
      a[i] === b[i + 1] &&
      a[i + 1] === b[i] &&
      a.slice(i + 2) === b.slice(i + 2)
    )
      return i
    return -1
  }
  // insertion/deletion at i
  const [shorter, longer] = la < lb ? [a, b] : [b, a]
  if (shorter.slice(i) === longer.slice(i + 1)) return i
  return -1
}

/**
 * Grade a typed answer against accepted forms.
 * - exact (after normalization) → correct
 * - German noun capitalization mistakes → correct with 'caps' note
 * - accent-only difference → correct with 'accent' note when folding is on, wrong otherwise
 * - one typo outside the grammatical suffix (words > 4 chars) → correct with 'typo' note
 */
export function grade(input: string, accepted: string[], opts: GradeOptions): GradeResult {
  const user = normalize(input)
  const strictLen = opts.strictSuffixLen ?? 0

  for (const acc of accepted) {
    const target = normalize(acc)
    if (user === target) return { correct: true }
  }

  for (const acc of accepted) {
    const target = normalize(acc)
    if (user.toLowerCase() === target.toLowerCase()) {
      return { correct: true, note: 'caps' }
    }
  }

  for (const acc of accepted) {
    const target = normalize(acc)
    const userF = fold(user.toLowerCase(), opts.lang)
    const targetF = fold(target.toLowerCase(), opts.lang)
    if (userF === targetF) {
      // German: ß≡ss and ae/oe/ue are legitimate spellings — plain correct.
      if (opts.lang === 'de') return { correct: true }
      // Spanish: accent-only difference — correct with note only if the setting allows.
      if (opts.foldDiacritics) return { correct: true, note: 'accent' }
    }
  }

  // typo tolerance: one edit, only on longer words, never inside the grammatical suffix
  for (const acc of accepted) {
    const target = fold(normalize(acc).toLowerCase(), opts.lang)
    const userF = fold(user.toLowerCase(), opts.lang)
    if (target.length <= 4) continue
    const pos = oneEditPosition(userF, target)
    if (pos !== null && pos >= 0 && pos < target.length - strictLen) {
      return { correct: true, note: 'typo' }
    }
  }

  return { correct: false }
}
