import type { Topic, Unit } from '../types'
import { DE_U1_TOPICS } from './units/u1'
import { DE_U2_TOPICS } from './units/u2'
import { DE_U3_TOPICS } from './units/u3'
import { DE_U4_TOPICS } from './units/u4'
import { DE_U5_TOPICS } from './units/u5'
import { DE_U6_TOPICS } from './units/u6'

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
  {
    id: 'de-u3',
    lang: 'de',
    title: 'Modal & Co',
    blurb: {
      en: 'Modal verbs, separable verbs and the imperative',
      it: 'Verbi modali, verbi separabili e imperativo',
    },
    topicIds: [
      'de-modal-verbs',
      'de-separable-verbs',
      'de-imperative',
      'de-possessives',
      'de-acc-pronouns',
    ],
    packIds: ['de-pack-house'],
  },
  {
    id: 'de-u4',
    lang: 'de',
    title: 'Der Dativ',
    blurb: { en: 'The dative case and prepositions', it: 'Il dativo e le preposizioni' },
    topicIds: [
      'de-dative-case',
      'de-dative-pronouns',
      'de-dative-verbs',
      'de-prep-acc',
      'de-prep-dat',
      'de-two-way-preps',
    ],
    packIds: ['de-pack-clothes'],
  },
  {
    id: 'de-u5',
    lang: 'de',
    title: 'Vergangenheit',
    blurb: { en: 'The perfect tense', it: 'Il passato prossimo (Perfekt)' },
    topicIds: ['de-perfect-haben', 'de-perfect-sein', 'de-praeteritum-sein-haben'],
    packIds: ['de-pack-routine'],
  },
  {
    id: 'de-u6',
    lang: 'de',
    title: 'Komplexe Sätze',
    blurb: { en: 'Subordinate clauses and comparisons', it: 'Frasi subordinate e comparativi' },
    topicIds: ['de-subclause-weil-dass', 'de-weil-vs-denn', 'de-comparative', 'de-wo-questions-recap'],
    packIds: ['de-pack-travel'],
  },
]

export const DE_TOPICS: Topic[] = [
  ...DE_U1_TOPICS,
  ...DE_U2_TOPICS,
  ...DE_U3_TOPICS,
  ...DE_U4_TOPICS,
  ...DE_U5_TOPICS,
  ...DE_U6_TOPICS,
]
export const DE_TOPIC_BY_ID = new Map(DE_TOPICS.map((t) => [t.id, t]))

/** the German A1-A2 course is fully authored — nothing upcoming */
export const DE_UPCOMING_UNITS: { title: string; blurb: { en: string; it: string } }[] = []
