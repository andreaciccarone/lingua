import type { Topic, Unit } from '../types'
import { DE_U1_TOPICS } from './units/u1'
import { DE_U2_TOPICS } from './units/u2'

export const DE_UNITS: Unit[] = [
  {
    id: 'de-u1',
    lang: 'de',
    title: 'Erste Schritte',
    blurb: 'Genders, pronouns, first verbs and word order',
    topicIds: [
      'de-noun-gender',
      'de-personal-pronouns',
      'de-sein-present',
      'de-haben-present',
      'de-regular-present',
      'de-word-order-v2',
    ],
    packIds: ['de-pack-basics', 'de-pack-family'],
  },
  {
    id: 'de-u2',
    lang: 'de',
    title: 'Sätze bauen',
    blurb: 'Questions, plurals, cases and negation',
    topicIds: [
      'de-questions',
      'de-plurals',
      'de-nom-acc',
      'de-negation',
      'de-vowel-change',
      'de-coord-conjunctions',
    ],
    packIds: ['de-pack-food', 'de-pack-town', 'de-pack-daily'],
  },
]

export const DE_TOPICS: Topic[] = [...DE_U1_TOPICS, ...DE_U2_TOPICS]
export const DE_TOPIC_BY_ID = new Map(DE_TOPICS.map((t) => [t.id, t]))
