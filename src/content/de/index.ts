import type { Topic, Unit } from '../types'
import { DE_U1_TOPICS } from './units/u1'
import { DE_U2_TOPICS } from './units/u2'

export const DE_UNITS: Unit[] = [
  {
    id: 'de-u1',
    lang: 'de',
    title: 'Erste Schritte',
    blurb: { en: 'Genders, pronouns, first verbs and word order', it: 'Generi, pronomi, primi verbi e ordine delle parole' },
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
    blurb: { en: 'Questions, plurals, cases and negation', it: 'Domande, plurali, casi e negazione' },
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

/** designed but not yet authored — shown greyed-out on the path */
export const DE_UPCOMING_UNITS: { title: string; blurb: { en: string; it: string } }[] = [
  { title: 'Modal & Co', blurb: { en: 'Modal verbs, separable verbs, imperative', it: 'Verbi modali, verbi separabili, imperativo' } },
  { title: 'Der Dativ', blurb: { en: 'The dative case and prepositions', it: 'Il dativo e le preposizioni' } },
  { title: 'Vergangenheit', blurb: { en: 'The perfect tense', it: 'Il passato prossimo (Perfekt)' } },
  { title: 'Komplexe Sätze', blurb: { en: 'Subordinate clauses', it: 'Le frasi subordinate' } },
]
