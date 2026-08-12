// Headless end-to-end smoke: plays the first grammar topic, a word pack,
// verifies persistence across reload, then clears the review queue.
// The player solves match boards correctly (required to advance) and answers
// other exercises best-effort — wrong answers are fine, flow completion is the test.
// Usage: node scripts/smoke.mjs [url] [screenshot-dir]
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:5173/lingua/'
const shotDir = process.argv[3] ?? 'scripts/shots'

const SER = { yo: 'soy', tú: 'eres', él: 'es', ella: 'es', nosotros: 'somos', nosotras: 'somos', vosotros: 'sois', vosotras: 'sois', ellos: 'son', ellas: 'son' }
const HABLAR = { yo: 'hablo', tú: 'hablas', él: 'habla', ella: 'habla', nosotros: 'hablamos', nosotras: 'hablamos', vosotros: 'habláis', vosotras: 'habláis', ellos: 'hablan', ellas: 'hablan' }
const ESTAR = { yo: 'estoy', tú: 'estás', él: 'está', ella: 'está', nosotros: 'estamos', nosotras: 'estamos', vosotros: 'estáis', vosotras: 'estáis', ellos: 'están', ellas: 'están' }
const COMER = { yo: 'como', tú: 'comes', él: 'come', ella: 'come', nosotros: 'comemos', nosotras: 'comemos', vosotros: 'coméis', vosotras: 'coméis', ellos: 'comen', ellas: 'comen' }
const VERB_MAPS = { ser: SER, hablar: HABLAR, estar: ESTAR, comer: COMER }
const LEX = {
  'la casa': 'house', 'el libro': 'book', 'el agua': 'water', 'el café': 'coffee',
  'el pan': 'bread', 'la mujer': 'woman', 'el hombre': 'man', 'el amigo': 'friend',
  hablar: 'to speak', comer: 'to eat', beber: 'to drink', trabajar: 'to work',
  // pronoun topic match pairs
  yo: 'I', tú: 'you', él: 'he', nosotros: 'we', ellas: 'they (f)',
}

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

const visible = (loc) => loc.isVisible().catch(() => false)
const FEEDBACK = /^Correct!$|^Not quite\.$/

async function solveMatch() {
  const title = (await page.locator('main p').first().textContent()) ?? ''
  const verb = /[“"]([^”"]+)[”"]/.exec(title)?.[1]
  const map = (verb && VERB_MAPS[verb]) || LEX
  const left = page.locator('main .grid > div:first-child button:not([disabled])')
  while ((await left.count()) > 0) {
    const btn = left.first()
    const t = (await btn.textContent())?.trim()
    const target = map[t] ?? LEX[t]
    if (!target) throw new Error(`no match target for "${t}" on board "${title}"`)
    await btn.click()
    await page
      .locator('main .grid > div:last-child button', { hasText: new RegExp(`^${escapeRe(target)}$`) })
      .click()
  }
  await page.getByText(FEEDBACK).waitFor()
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function clozeAnswer() {
  const text = (await page.locator('main p').first().textContent()) ?? ''
  const pronoun = /^(\p{L}+)/u.exec(text.trim())?.[1]?.toLowerCase()
  const verb = /\(([^)]+)\)/.exec(text)?.[1]
  return VERB_MAPS[verb]?.[pronoun] ?? 'x'
}

async function playSession(label) {
  for (let guard = 0; guard < 150; guard++) {
    if (await visible(page.getByText(/complete$|complete /))) {
      await page.getByRole('button', { name: 'Continue' }).click()
      return
    }
    if (await visible(page.getByText(FEEDBACK))) {
      await page.getByRole('button', { name: 'Continue' }).click()
      await page.getByText(FEEDBACK).waitFor({ state: 'hidden' }).catch(() => {})
      continue
    }
    if (await visible(page.getByText('New word'))) {
      await page.getByRole('button', { name: 'Reveal meaning' }).click()
      await page.getByRole('button', { name: 'Got it' }).click()
      continue
    }
    const input = page.getByPlaceholder('Type the missing word')
    if (await visible(input)) {
      await input.fill(await clozeAnswer())
      await page.getByRole('button', { name: 'Check' }).click()
      await page.getByText(FEEDBACK).waitFor()
      continue
    }
    if (await visible(page.locator('main .grid > div:first-child button').first())) {
      await solveMatch()
      continue
    }
    const mcOption = page.locator('main div.grid > button').first()
    if (await visible(mcOption)) {
      await mcOption.click()
      await page.getByText(FEEDBACK).waitFor()
      continue
    }
    // word-order tiles: place every tile (any order — wrong is fine), then Check
    const bankTile = page.locator('main div.flex.flex-wrap.justify-center > button').first()
    if (await visible(bankTile)) {
      while (await visible(page.locator('main div.flex.flex-wrap.justify-center > button').first())) {
        await page.locator('main div.flex.flex-wrap.justify-center > button').first().click()
      }
      await page.getByRole('button', { name: 'Check' }).click()
      await page.getByText(FEEDBACK).waitFor()
      continue
    }
    await page.waitForTimeout(200)
  }
  throw new Error(`session "${label}" did not finish`)
}

try {
  await page.goto(url)
  await page.getByText('Lingua', { exact: true }).waitFor()
  await page.screenshot({ path: `${shotDir}/1-home.png` })

  // 1. first grammar topic: intro page, then the lesson
  await page.getByText('Noun gender: el & la').click()
  await page.getByText('Start lesson').waitFor()
  await page.screenshot({ path: `${shotDir}/2-topic-intro.png` })
  await page.getByText('Start lesson').click()
  await page.getByText(/New word|___/).waitFor()
  await playSession('noun-gender')
  await page.getByText('Lingua', { exact: true }).waitFor()

  // topic done -> checkmark + dependent topic unlocked
  await page.getByText('Plurals: los, las, un & una').waitFor()
  await page.screenshot({ path: `${shotDir}/3-home-after-topic.png` })

  // 2. word pack
  await page.getByText('First words').click()
  await page.getByText('New word').waitFor()
  await playSession('vocab-pack')
  await page.getByText('Lingua', { exact: true }).waitFor()

  // 3. review counts exist
  await page.getByText('Review', { exact: true }).click()
  await page.getByText('grammar skills').waitFor()
  await page.screenshot({ path: `${shotDir}/4-review-due.png` })

  // 4. persistence across reload
  await page.reload()
  await page.getByText('grammar skills').waitFor()

  // 5. play the review session
  await page.getByText('Start review').click()
  await playSession('review')
  await page.screenshot({ path: `${shotDir}/5-review-done.png` })

  // 6. switch to German and play the first German topic
  await page.locator('nav').getByText('Learn', { exact: true }).click()
  await page.getByText('Deutsch').click()
  await page.getByText('Erste Schritte').waitFor()
  await page.screenshot({ path: `${shotDir}/6-german-path.png` })
  await page.getByText('der, die, das').click()
  await page.getByText('Start lesson').waitFor()
  await page.getByText('Start lesson').click()
  await page.getByText(/New word|___/).waitFor()
  await playSession('german-gender')
  await page.getByText('Erste Schritte').waitFor()
  await page.screenshot({ path: `${shotDir}/7-german-done.png` })

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
