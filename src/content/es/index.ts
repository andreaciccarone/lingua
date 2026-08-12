import type { Topic, Unit } from '../types'
import { ES_U1_TOPICS } from './units/u1'
import { ES_U2_TOPICS } from './units/u2'

export const ES_UNITS: Unit[] = [
  {
    id: 'es-u1',
    lang: 'es',
    title: 'Primeros pasos',
    blurb: 'Nouns, articles and being',
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
    blurb: 'Regular verbs and everyday sentences',
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
