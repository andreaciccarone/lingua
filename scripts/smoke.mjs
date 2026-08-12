// Headless end-to-end smoke: plays the demo lesson, the vocab pack, verifies
// persistence across reload, then clears the review queue.
// Usage: node scripts/smoke.mjs [url] [screenshot-dir]
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:5173/lingua/'
const shotDir = process.argv[3] ?? 'scripts/shots'

const SER = { yo: 'soy', tú: 'eres', él: 'es', ella: 'es', nosotros: 'somos', nosotras: 'somos', vosotros: 'sois', vosotras: 'sois', ellos: 'son', ellas: 'son' }
const HABLAR = { yo: 'hablo', tú: 'hablas', él: 'habla', ella: 'habla', nosotros: 'hablamos', nosotras: 'hablamos', vosotros: 'habláis', vosotras: 'habláis', ellos: 'hablan', ellas: 'hablan' }
const VERB_MAPS = { ser: SER, hablar: HABLAR }
const LEX = {
  'la casa': 'house', 'el libro': 'book', 'el agua': 'water', 'el café': 'coffee',
  'el pan': 'bread', 'la mujer': 'woman', 'el hombre': 'man', 'el amigo': 'friend',
  hablar: 'to speak', comer: 'to eat', beber: 'to drink', trabajar: 'to work',
}
const GLOSS_TO_WORD = Object.fromEntries(Object.entries(LEX).map(([w, g]) => [g, w]))

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

const visible = (loc) => loc.isVisible().catch(() => false)

async function grammarAnswer() {
  let text = ''
  for (let i = 0; i < 20; i++) {
    text = (await page.locator('main p').first().textContent()) ?? ''
    if (text.includes('__')) break // unfilled gap = the new exercise is rendered
    await page.waitForTimeout(100)
  }
  const pronoun = /^(\p{L}+)/u.exec(text.trim())?.[1]?.toLowerCase()
  const verb = /\(([^)]+)\)/.exec(text)?.[1]
  const form = VERB_MAPS[verb]?.[pronoun]
  if (!form) throw new Error(`no answer for "${text}"`)
  return form
}

async function solveMatch() {
  // the board title names the verb: …right form of “hablar” — vocab boards don't
  const title = (await page.locator('main p').first().textContent()) ?? ''
  const verb = /[“"]([^”"]+)[”"]/.exec(title)?.[1]
  const map = verb ? VERB_MAPS[verb] : LEX
  if (!map) throw new Error(`no map for match board "${title}"`)
  const left = page.locator('main .grid > div:first-child button:not([disabled])')
  while ((await left.count()) > 0) {
    const btn = left.first()
    const t = (await btn.textContent())?.trim()
    const target = map[t]
    if (!target) throw new Error(`no match target for "${t}" on board "${title}"`)
    await btn.click()
    await page
      .locator('main .grid > div:last-child button', { hasText: new RegExp(`^${target}$`) })
      .click()
  }
  await page.getByText(/^Correct!$|^Not quite\.$/).waitFor()
}

async function playSession(label) {
  for (let guard = 0; guard < 120; guard++) {
    if (await visible(page.getByText(/complete$|complete /))) {
      await page.getByRole('button', { name: 'Continue' }).click()
      return
    }
    if (await visible(page.getByText(/^Correct!$|^Not quite\.$/))) {
      await page.getByRole('button', { name: 'Continue' }).click()
      await page
        .getByText(/^Correct!$|^Not quite\.$/)
        .waitFor({ state: 'hidden' })
        .catch(() => {})
      continue
    }
    if (await visible(page.getByText('New word'))) {
      await page.getByRole('button', { name: 'Reveal meaning' }).click()
      await page.getByRole('button', { name: 'Got it' }).click()
      continue
    }
    if (await visible(page.getByText(/^Match each/))) {
      await solveMatch()
      continue
    }
    if (await visible(page.getByText('What does this mean?'))) {
      const word = (await page.locator('main p').first().textContent())?.trim()
      const gloss = LEX[word]
      if (!gloss) throw new Error(`unknown word "${word}"`)
      await page.getByRole('button', { name: gloss, exact: true }).click()
      await page.getByText(/^Correct!$|^Not quite\.$/).waitFor()
      continue
    }
    const input = page.getByPlaceholder('Type the missing word')
    if (await visible(input)) {
      const glossEl = await visible(page.locator('main .text-sm'))
        ? (await page.locator('main .text-sm').first().textContent())?.trim()
        : ''
      let answer
      const bare = glossEl?.replace(/^the /, '')
      if (GLOSS_TO_WORD[glossEl]) answer = GLOSS_TO_WORD[glossEl]
      else if (bare && GLOSS_TO_WORD[bare]) answer = GLOSS_TO_WORD[bare]
      else answer = await grammarAnswer()
      await input.fill(answer)
      await page.getByRole('button', { name: 'Check' }).click()
      await page.getByText(/^Correct!$|^Not quite\.$/).waitFor()
      continue
    }
    if (await visible(page.locator('main').getByText('(ser)').or(page.locator('main').getByText('(hablar)')))) {
      const form = await grammarAnswer()
      await page.getByRole('button', { name: form, exact: true }).click()
      await page.getByText(/^Correct!$|^Not quite\.$/).waitFor()
      continue
    }
    await page.waitForTimeout(200)
  }
  throw new Error(`session "${label}" did not finish`)
}

try {
  await page.goto(url)
  await page.getByText('Lingua', { exact: true }).waitFor()

  // 1. grammar demo lesson
  await page.getByText('Try a lesson').click()
  await page.getByText(/Match each pronoun/).waitFor()
  await playSession('demo')
  await page.getByText('Lingua', { exact: true }).waitFor()
  await page.screenshot({ path: `${shotDir}/1-after-lesson.png` })

  // 2. vocab pack
  await page.getByText('Learn words').click()
  await page.getByText('New word').waitFor()
  await playSession('vocab')
  await page.getByText('Lingua', { exact: true }).waitFor()

  // 3. review counts exist
  await page.getByText('Review', { exact: true }).click()
  await page.getByText('grammar skills').waitFor()
  await page.screenshot({ path: `${shotDir}/2-review-due.png` })

  // 4. persistence across reload
  await page.reload()
  await page.getByText('grammar skills').waitFor()

  // 5. play the review session
  await page.getByText('Start review').click()
  await playSession('review')
  await page.screenshot({ path: `${shotDir}/3-review-done.png` })

  console.log('SMOKE OK')
} catch (e) {
  await page.screenshot({ path: `${shotDir}/error.png` }).catch(() => {})
  console.error('SMOKE FAILED:', e.message)
  process.exitCode = 1
} finally {
  if (errors.length) {
    console.error('console errors:', errors.join('\n'))
    process.exitCode = 1
  }
  await browser.close()
}
