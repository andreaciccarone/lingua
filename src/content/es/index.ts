import type { Topic, Unit } from '../types'
import { ES_U1_TOPICS } from './units/u1'
import { ES_U2_TOPICS } from './units/u2'
import { ES_U3_TOPICS } from './units/u3'
import { ES_U4_TOPICS } from './units/u4'
import { ES_U5_TOPICS } from './units/u5'
import { ES_U6_TOPICS } from './units/u6'
import { ES_U7_TOPICS } from './units/u7'

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
    packIds: ['es-pack-food', 'es-pack-town', 'es-pack-daily', 'es-pack-food2'],
  },
  {
    id: 'es-u3',
    lang: 'es',
    title: 'Verbos con carácter',
    blurb: { en: 'Irregulars and stem-changers', it: 'Verbi irregolari e con dittongazione' },
    topicIds: [
      'es-tener-venir',
      'es-ir-future',
      'es-go-verbs',
      'es-stem-e-ie',
      'es-stem-o-ue-e-i',
      'es-saber-conocer',
    ],
    packIds: ['es-pack-house', 'es-pack-actions', 'es-pack-work'],
  },
  {
    id: 'es-u4',
    lang: 'es',
    title: 'La gente y las cosas',
    blurb: {
      en: 'Possessives, object pronouns and gustar',
      it: 'Possessivi, pronomi oggetto e gustar',
    },
    topicIds: [
      'es-possessives',
      'es-demonstratives',
      'es-personal-a',
      'es-dop',
      'es-iop',
      'es-gustar',
    ],
    packIds: ['es-pack-clothes', 'es-pack-describe2', 'es-pack-feelings', 'es-pack-tech'],
  },
  {
    id: 'es-u5',
    lang: 'es',
    title: 'Mi día',
    blurb: { en: 'Reflexives, routines and comparisons', it: 'Riflessivi, routine e comparativi' },
    topicIds: ['es-reflexives', 'es-progressive', 'es-obligation', 'es-comparatives'],
    packIds: ['es-pack-routine', 'es-pack-body'],
  },
  {
    id: 'es-u6',
    lang: 'es',
    title: 'Ayer',
    blurb: { en: 'The past tense', it: 'Il passato' },
    topicIds: ['es-preterite-regular', 'es-preterite-irregular', 'es-past-time'],
    packIds: ['es-pack-travel', 'es-pack-nature', 'es-pack-city'],
  },
  {
    id: 'es-u7',
    lang: 'es',
    title: 'Un paso más',
    blurb: {
      en: 'The imperfect, present perfect, commands and por/para',
      it: 'Imperfetto, passato prossimo, imperativo e por/para',
    },
    topicIds: ['es-imperfect', 'es-perfect', 'es-imperative', 'es-por-para'],
    packIds: ['es-pack-time'],
  },
]

export const ES_TOPICS: Topic[] = [
  ...ES_U1_TOPICS,
  ...ES_U2_TOPICS,
  ...ES_U3_TOPICS,
  ...ES_U4_TOPICS,
  ...ES_U5_TOPICS,
  ...ES_U6_TOPICS,
  ...ES_U7_TOPICS,
]
export const ES_TOPIC_BY_ID = new Map(ES_TOPICS.map((t) => [t.id, t]))

/** the Spanish A1-A2 course is fully authored — nothing upcoming */
export const ES_UPCOMING_UNITS: { title: string; blurb: { en: string; it: string } }[] = []
