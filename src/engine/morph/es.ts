import type { AdjEntry, NounEntry } from '../../content/types'

export type EsNumber = 'sg' | 'pl'

/** definite/indefinite article with gender+number agreement (respects el-agua override) */
export function articleEs(noun: NounEntry, def: boolean, number: EsNumber): string {
  const es = noun.es
  if (!es) throw new Error(`${noun.id} has no Spanish morphology`)
  if (number === 'sg') {
    if (def) return es.singularArticle ?? (es.gender === 'm' ? 'el' : 'la')
    return es.gender === 'm' ? 'un' : 'una'
  }
  if (def) return es.gender === 'm' ? 'los' : 'las'
  return es.gender === 'm' ? 'unos' : 'unas'
}

/** plural formation: vowel+s, z→ces, consonant+es, explicit override wins */
export function pluralEs(noun: NounEntry): string {
  if (noun.es?.pluralIrregular) return noun.es.pluralIrregular
  const l = noun.lemma
  if (l.endsWith('z')) return l.slice(0, -1) + 'ces'
  if (/[aeiouáéíóú]$/.test(l)) return l + 's'
  return l + 'es'
}

/** adjective agreement: -o adjectives inflect fully; others only for number */
export function adjAgreeEs(adj: AdjEntry, gender: 'm' | 'f', number: EsNumber): string {
  const es = adj.es
  if (es?.formsOverride) {
    const f = es.formsOverride
    return number === 'sg' ? (gender === 'm' ? f.m : f.f) : gender === 'm' ? f.mpl : f.fpl
  }
  let base = adj.lemma
  if (!es?.invariable && base.endsWith('o') && gender === 'f') base = base.slice(0, -1) + 'a'
  if (number === 'pl') {
    if (/[aeiou]$/.test(base)) return base + 's'
    return base + 'es'
  }
  return base
}
