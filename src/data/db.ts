import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Lang } from '../content/types'
import type { SrsState } from '../engine/srs/scheduler'

export interface CardRecord {
  id: string // skill: "topicId:cellId" | vocab: "es/vocab/hablar:recog"
  lang: Lang
  kind: 'skill' | 'vocab'
  /** topic id for skills, pack id for vocab — powers per-topic mastery */
  sourceId: string
  srs: SrsState
}

export interface LessonRecord {
  lessonId: string
  completedAt: number
  bestScore: number
  attempts: number
}

export interface DayRecord {
  date: string // 'YYYY-MM-DD' local
  xp: number
  reviewsDone: number
}

export interface Settings {
  activeLang: Lang
  dailyGoalXp: number
  foldDiacritics: boolean
  ttsRate: number
  ttsVoiceURI: Partial<Record<Lang, string>>
  listeningEnabled: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  activeLang: 'es',
  dailyGoalXp: 50,
  foldDiacritics: false,
  ttsRate: 0.9,
  ttsVoiceURI: {},
  listeningEnabled: true,
}

interface LinguaDB extends DBSchema {
  cards: {
    key: string
    value: CardRecord
    indexes: { 'by-lang-due': [string, string] }
  }
  lessons: { key: string; value: LessonRecord }
  days: { key: string; value: DayRecord }
  kv: { key: string; value: unknown }
}

let dbPromise: Promise<IDBPDatabase<LinguaDB>> | null = null

export function getDB(): Promise<IDBPDatabase<LinguaDB>> {
  dbPromise ??= openDB<LinguaDB>('lingua', 1, {
    upgrade(db) {
      const cards = db.createObjectStore('cards', { keyPath: 'id' })
      cards.createIndex('by-lang-due', ['lang', 'srs.due'])
      db.createObjectStore('lessons', { keyPath: 'lessonId' })
      db.createObjectStore('days', { keyPath: 'date' })
      db.createObjectStore('kv')
    },
  })
  return dbPromise
}

export async function getCard(id: string): Promise<CardRecord | undefined> {
  return (await getDB()).get('cards', id)
}

export async function putCard(card: CardRecord): Promise<void> {
  await (await getDB()).put('cards', card)
}

/** all cards due today or earlier for a language, most overdue first */
export async function getDueCards(lang: Lang, today: string): Promise<CardRecord[]> {
  const db = await getDB()
  const range = IDBKeyRange.bound([lang, '0000-00-00'], [lang, today])
  const due = await db.getAllFromIndex('cards', 'by-lang-due', range)
  return due.sort((a, b) => a.srs.due.localeCompare(b.srs.due))
}

export async function getAllCards(lang: Lang): Promise<CardRecord[]> {
  const db = await getDB()
  const all = await db.getAll('cards')
  return all.filter((c) => c.lang === lang)
}

export async function getLesson(lessonId: string): Promise<LessonRecord | undefined> {
  return (await getDB()).get('lessons', lessonId)
}

export async function recordLesson(lessonId: string, score: number): Promise<void> {
  const db = await getDB()
  const prev = await db.get('lessons', lessonId)
  await db.put('lessons', {
    lessonId,
    completedAt: Date.now(),
    bestScore: Math.max(score, prev?.bestScore ?? 0),
    attempts: (prev?.attempts ?? 0) + 1,
  })
}

export async function bumpDay(date: string, xp: number, reviews: number): Promise<DayRecord> {
  const db = await getDB()
  const prev = (await db.get('days', date)) ?? { date, xp: 0, reviewsDone: 0 }
  const next = { date, xp: prev.xp + xp, reviewsDone: prev.reviewsDone + reviews }
  await db.put('days', next)
  return next
}

export async function getDays(): Promise<DayRecord[]> {
  return (await getDB()).getAll('days')
}

export async function getSettings(): Promise<Settings> {
  const stored = (await (await getDB()).get('kv', 'settings')) as Partial<Settings> | undefined
  return { ...DEFAULT_SETTINGS, ...stored }
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const db = await getDB()
  const next = { ...(await getSettings()), ...patch }
  await db.put('kv', next, 'settings')
  return next
}
