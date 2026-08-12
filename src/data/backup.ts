import { getDB, getSettings, type CardRecord, type DayRecord, type LessonRecord, type Settings } from './db'
import { todayLocal } from '../lib/dates'

interface BackupV1 {
  version: 1
  exportedAt: string
  cards: CardRecord[]
  lessons: LessonRecord[]
  days: DayRecord[]
  settings: Settings
}

export async function buildBackup(): Promise<BackupV1> {
  const db = await getDB()
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    cards: await db.getAll('cards'),
    lessons: await db.getAll('lessons'),
    days: await db.getAll('days'),
    settings: await getSettings(),
  }
}

/** share sheet on iOS (works in home-screen apps), download link elsewhere */
export async function exportBackup(): Promise<void> {
  const data = await buildBackup()
  const name = `lingua-backup-${todayLocal()}.json`
  const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' })
  const file = new File([blob], name, { type: 'application/json' })

  if (navigator.canShare?.({ files: [file] })) {
    // user cancelling the sheet rejects with AbortError — that's fine
    await navigator.share({ files: [file], title: 'Lingua backup' }).catch(() => {})
    return
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

/** full-replace import; returns what was restored */
export async function importBackup(text: string): Promise<{ cards: number; days: number }> {
  let data: BackupV1
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Not a valid backup file')
  }
  if (data.version !== 1 || !Array.isArray(data.cards)) {
    throw new Error('Unsupported backup format')
  }

  const db = await getDB()
  const tx = db.transaction(['cards', 'lessons', 'days', 'kv'], 'readwrite')
  await Promise.all([
    tx.objectStore('cards').clear(),
    tx.objectStore('lessons').clear(),
    tx.objectStore('days').clear(),
  ])
  for (const c of data.cards) void tx.objectStore('cards').put(c)
  for (const l of data.lessons ?? []) void tx.objectStore('lessons').put(l)
  for (const d of data.days ?? []) void tx.objectStore('days').put(d)
  if (data.settings) void tx.objectStore('kv').put(data.settings, 'settings')
  await tx.done
  return { cards: data.cards.length, days: (data.days ?? []).length }
}

export async function resetAllProgress(): Promise<void> {
  const db = await getDB()
  const tx = db.transaction(['cards', 'lessons', 'days'], 'readwrite')
  await Promise.all([
    tx.objectStore('cards').clear(),
    tx.objectStore('lessons').clear(),
    tx.objectStore('days').clear(),
  ])
  await tx.done
}
