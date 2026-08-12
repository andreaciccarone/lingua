import type { Lang } from '../content/types'
import { applyGrade, deriveGrade, initialSrs, type AnswerResult } from '../engine/srs/scheduler'
import { todayLocal } from '../lib/dates'
import { bumpDay, getCard, putCard, recordLesson, type CardRecord } from './db'

export interface CardMeta {
  lang: Lang
  kind: 'skill' | 'vocab'
  sourceId: string
}

/** Feed one answer into a card's SRS state (creating the card on first sight). */
export async function recordAnswer(
  skillId: string,
  meta: CardMeta,
  result: AnswerResult,
): Promise<CardRecord> {
  const today = todayLocal()
  const existing = await getCard(skillId)
  const card: CardRecord = existing ?? {
    id: skillId,
    lang: meta.lang,
    kind: meta.kind,
    sourceId: meta.sourceId,
    srs: initialSrs(today),
  }
  const grade = deriveGrade(result)
  const next: CardRecord = {
    ...card,
    srs: applyGrade(card.srs, grade, { today, rand: Math.random }),
  }
  await putCard(next)
  return next
}

export interface SessionSummary {
  lessonId?: string
  firstTryCorrect: number
  total: number
  isReview: boolean
}

const XP_LESSON_COMPLETE = 20
const XP_REVIEW_CLEARED = 15
const XP_FIRST_TRY = 10
const XP_RETRY = 5

export async function finishSession(s: SessionSummary): Promise<{ xp: number }> {
  const xp =
    s.firstTryCorrect * XP_FIRST_TRY +
    (s.total - s.firstTryCorrect) * XP_RETRY +
    (s.isReview ? XP_REVIEW_CLEARED : XP_LESSON_COMPLETE)
  await bumpDay(todayLocal(), xp, s.isReview ? s.total : 0)
  if (s.lessonId) {
    await recordLesson(s.lessonId, Math.round((s.firstTryCorrect / s.total) * 100))
  }
  return { xp }
}
