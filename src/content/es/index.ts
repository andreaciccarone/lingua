import type { Topic, Unit } from '../types'
import { ES_U1_TOPICS } from './units/u1'
import { ES_U2_TOPICS } from './units/u2'

export const ES_UNITS: Unit[] = [
  {
    id: 'es-u1',
    lang: 'es',
    title: 'Primeros pasos',
    blurb: { en: 'Nouns, articles and being', it: 'Nomi, articoli ed essere' },
    topicIds: [
      'es-noun-gender',
      'es-plural-articles',
      'es-subject-pronouns',
      'es-ser-present',
      'es-adj-agreement',
    ],
    packIds: ['es-pack-basics', 'es-pack-family', 'es-pack-describe'],
  },
  {
    id: 'es-u2',
    lang: 'es',
    title: 'El presente',
    blurb: { en: 'Regular verbs and everyday sentences', it: 'Verbi regolari e frasi quotidiane' },
    topicIds: [
      'es-present-ar',
      'es-present-er-ir',
      'es-negation',
      'es-questions',
      'es-estar-present',
      'es-ser-vs-estar',
    ],
    packIds: ['es-pack-food', 'es-pack-town', 'es-pack-daily'],
  },
]

export const ES_TOPICS: Topic[] = [...ES_U1_TOPICS, ...ES_U2_TOPICS]
export const ES_TOPIC_BY_ID = new Map(ES_TOPICS.map((t) => [t.id, t]))

/** designed but not yet authored — shown greyed-out on the path */
export const ES_UPCOMING_UNITS: { title: string; blurb: { en: string; it: string } }[] = [
  { title: 'Verbos con carácter', blurb: { en: 'Irregulars and stem-changers', it: 'Verbi irregolari e con dittongazione' } },
  { title: 'La gente y las cosas', blurb: { en: 'Possessives, object pronouns, gustar', it: 'Possessivi, pronomi oggetto, gustar' } },
  { title: 'Mi día', blurb: { en: 'Reflexives, routines and comparisons', it: 'Riflessivi, routine e comparativi' } },
  { title: 'Ayer', blurb: { en: 'The past tense', it: 'Il passato' } },
]
