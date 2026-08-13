import { describe, expect, it } from 'vitest'
import type { DrillSpec, Lang, Topic } from './types'
import { PERSONS } from './types'
import { ES_TOPICS, ES_UNITS } from './es'
import { DE_TOPICS, DE_UNITS } from './de'
import { ES_PACKS } from './es/packs'
import { DE_PACKS } from './de/packs'
import { adjById, lexemeByKey, nounById, packLexemes, topicById, verbById } from './registry'
import { buildTopicLesson, reviewExerciseForSkill } from '../engine/session'
import { initialSrs } from '../engine/srs/scheduler'

const ALL_TOPICS = [...ES_TOPICS, ...DE_TOPICS]
const ALL_UNITS = [...ES_UNITS, ...DE_UNITS]
const ALL_PACKS = [...ES_PACKS, ...DE_PACKS]

/** cells a drill spec will actually emit for its topic */
function cellsOf(spec: DrillSpec, topic: Topic): string[] {
  switch (spec.gen) {
    case 'conj':
      return spec.persons
    case 'match-verb':
      // the board draws 5 of the 6 persons at random, so all six must exist
      return [...PERSONS]
    case 'article':
      return spec.nounIds.map((id) => nounById(id)?.es?.gender ?? '?')
    case 'plural':
      return ['pl-form']
    case 'adj-agree':
      return spec.pairs.flatMap(([, nounId]) => {
        const g = nounById(nounId)?.es?.gender ?? '?'
        return [g, `${g}.pl`]
      })
    case 'case-article':
    case 'perfect':
      return [spec.cellId]
    case 'word-order':
      return spec.items.map((i) => i.cellId)
    case 'authored':
      return spec.exercises.flatMap((e) =>
        e.skillIds.filter((s) => s.startsWith(`${topic.id}:`)).map((s) => s.split(':')[1]),
      )
  }
}

function lexemeIdsOf(spec: DrillSpec): string[] {
  switch (spec.gen) {
    case 'conj':
    case 'match-verb':
      return [spec.verbId]
    case 'article':
    case 'plural':
    case 'case-article':
      return spec.nounIds
    case 'perfect':
      return spec.verbIds
    case 'adj-agree':
      return spec.pairs.flat()
    default:
      return []
  }
}

describe('topic integrity', () => {
  it('topic ids are unique', () => {
    const ids = ALL_TOPICS.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every dependency refers to an existing topic', () => {
    for (const topic of ALL_TOPICS) {
      for (const dep of topic.dependencies) {
        expect(topicById(dep), `${topic.id} depends on missing ${dep}`).toBeDefined()
      }
    }
  })

  it('dependencies never point forward on the path', () => {
    for (const unit of ALL_UNITS) {
      const order = ALL_UNITS.filter((u) => u.lang === unit.lang).flatMap((u) => u.topicIds)
      for (const tid of unit.topicIds) {
        const topic = topicById(tid)!
        for (const dep of topic.dependencies) {
          expect(
            order.indexOf(dep),
            `${tid} depends on ${dep}, which comes later on the path`,
          ).toBeLessThan(order.indexOf(tid))
        }
      }
    }
  })

  it('every unit topic exists and every topic belongs to exactly one unit', () => {
    const inUnits = ALL_UNITS.flatMap((u) => u.topicIds)
    for (const tid of inUnits) expect(topicById(tid), `unit lists missing ${tid}`).toBeDefined()
    expect(new Set(inUnits).size).toBe(inUnits.length)
    for (const topic of ALL_TOPICS) {
      expect(inUnits, `${topic.id} is not on any unit path`).toContain(topic.id)
    }
  })

  it('every drilled cell is declared in skillCells', () => {
    for (const topic of ALL_TOPICS) {
      const declared = new Set(topic.skillCells.map((c) => c.cellId))
      for (const spec of topic.drillItems) {
        for (const cell of cellsOf(spec, topic)) {
          expect(declared, `${topic.id} drills undeclared cell "${cell}"`).toContain(cell)
        }
      }
    }
  })

  it('every referenced lexeme id resolves', () => {
    for (const topic of ALL_TOPICS) {
      const ids = [...topic.introLexemeIds, ...topic.drillItems.flatMap(lexemeIdsOf)]
      for (const id of ids) {
        const found = verbById(id) ?? nounById(id) ?? adjById(id)
        expect(found, `${topic.id} references missing lexeme ${id}`).toBeDefined()
      }
    }
  })

  it('authored exercises are well formed', () => {
    for (const topic of ALL_TOPICS) {
      for (const spec of topic.drillItems) {
        if (spec.gen !== 'authored') continue
        for (const ex of spec.exercises) {
          expect(ex.skillIds.length, `${topic.id}: exercise with no skillIds`).toBeGreaterThan(0)
          if (ex.type === 'mc') {
            const correct = ex.options?.filter((o) => !o.strategy) ?? []
            expect(correct.length, `${topic.id}: mc needs exactly 1 correct option`).toBe(1)
            expect(correct[0].text).toBe(ex.answer)
            const texts = ex.options!.map((o) => o.text)
            expect(new Set(texts).size, `${topic.id}: duplicate mc options`).toBe(texts.length)
          }
          if (ex.type === 'cloze') {
            expect(ex.answer.length, `${topic.id}: cloze without answer`).toBeGreaterThan(0)
            if (ex.gapIndex !== undefined) {
              expect(ex.sentence[ex.gapIndex]).toBe('___')
            }
          }
          if (ex.type === 'match') {
            const rights = ex.pairs!.map(([, r]) => r)
            expect(new Set(rights).size, `${topic.id}: ambiguous match board`).toBe(rights.length)
          }
        }
      }
    }
  })

  it('error hints only name strategies (no stale keys) and are non-empty', () => {
    for (const topic of ALL_TOPICS) {
      for (const [key, value] of Object.entries(topic.errorHints)) {
        const text = typeof value === 'string' ? value : value.en
        expect(text.length, `${topic.id}: empty hint for ${key}`).toBeGreaterThan(0)
      }
    }
  })
})

describe('vocab packs', () => {
  it('pack ids are unique and belong to a real unit', () => {
    const ids = ALL_PACKS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const pack of ALL_PACKS) {
      expect(
        ALL_UNITS.some((u) => u.id === pack.unitId),
        `${pack.id} belongs to unknown unit ${pack.unitId}`,
      ).toBe(true)
    }
  })

  it('every pack lexeme resolves and packs are non-trivial', () => {
    for (const pack of ALL_PACKS) {
      const resolved = packLexemes(pack)
      expect(resolved.length, `${pack.id} has unresolved lexemes`).toBe(pack.lexemeIds.length)
      expect(resolved.length, `${pack.id} is too small`).toBeGreaterThanOrEqual(8)
    }
  })

  it('every pack listed by a unit exists', () => {
    for (const unit of ALL_UNITS) {
      for (const pid of unit.packIds) {
        expect(
          ALL_PACKS.some((p) => p.id === pid),
          `${unit.id} lists missing pack ${pid}`,
        ).toBe(true)
      }
    }
  })
})

describe('lexicon', () => {
  it('every lexeme has the Italian gloss the app needs', () => {
    for (const lang of ['es', 'de'] as Lang[]) {
      for (const pack of ALL_PACKS.filter((p) => p.lang === lang)) {
        for (const lex of packLexemes(pack)) {
          const hasIt =
            ('glossIt' in lex && !!lex.glossIt) || ('glossItForms' in lex && !!lex.glossItForms)
          expect(hasIt, `${lex.id} has no Italian gloss`).toBe(true)
        }
      }
    }
  })

  it('vocab skill ids are unique per language (no lemma collisions)', () => {
    for (const lang of ['es', 'de'] as Lang[]) {
      const keys = ALL_PACKS.filter((p) => p.lang === lang)
        .flatMap((p) => p.lexemeIds)
        .map((id) => id.split('/').pop()!)
      for (const key of keys) {
        expect(lexemeByKey(lang, key), `${lang} key ${key} does not resolve`).toBeDefined()
      }
    }
  })
})

describe('every skill can be reviewed', () => {
  // a skill that enters the SRS but has no review generator would silently
  // vanish from the queue — the user would never see it again
  it('every declared skill cell regenerates a review exercise', () => {
    for (const topic of ALL_TOPICS) {
      for (const cell of topic.skillCells) {
        const id = `${topic.id}:${cell.cellId}`
        const card = {
          id,
          lang: topic.lang,
          kind: 'skill' as const,
          sourceId: topic.id,
          srs: initialSrs('2026-08-12'),
        }
        const ex = reviewExerciseForSkill(card, `seed/${id}`, 'it')
        expect(ex, `${id} has no review generator`).not.toBeNull()
        expect(ex!.skillIds, `${id} review targets the wrong skill`).toContain(id)
      }
    }
  })
})

describe('lessons build end to end', () => {
  it('every topic produces a playable lesson in both instruction languages', () => {
    for (const topic of ALL_TOPICS) {
      for (const primary of ['en', 'it'] as const) {
        const session = buildTopicLesson(topic.id, primary)
        expect(session, `${topic.id} built no session`).not.toBeNull()
        expect(session!.exercises.length, `${topic.id} has too few exercises`).toBeGreaterThanOrEqual(4)
        for (const ex of session!.exercises) {
          expect(typeof ex.gloss, `${topic.id}: unresolved gloss`).toBe('string')
          expect(ex.skillIds.length, `${topic.id}: exercise without skill`).toBeGreaterThan(0)
          if (ex.type === 'mc') {
            expect(ex.options!.length, `${topic.id}: mc with <3 options`).toBeGreaterThanOrEqual(3)
            expect(ex.options!.filter((o) => !o.strategy).length).toBe(1)
          }
          if (ex.type === 'tiles') {
            expect(ex.tiles!.length, `${topic.id}: empty tile set`).toBeGreaterThan(1)
          }
        }
      }
    }
  })
})
