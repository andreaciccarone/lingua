// Headless smoke test: plays the start of the demo lesson against the dev server.
// Usage: node scripts/smoke.mjs [url] [screenshot-dir]
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:5173/lingua/'
const shotDir = process.argv[3] ?? 'scripts/shots'

const SER = { yo: 'soy', tú: 'eres', él: 'es', ella: 'es', nosotros: 'somos', nosotras: 'somos', vosotros: 'sois', vosotras: 'sois', ellos: 'son', ellas: 'son' }

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

try {
  await page.goto(url)
  await page.getByText('Lingua', { exact: true }).waitFor()
  await page.screenshot({ path: `${shotDir}/1-home.png` })

  await page.getByText('Try a lesson').click()
  await page.getByText(/Match each pronoun/).waitFor()
  await page.screenshot({ path: `${shotDir}/2-match.png` })

  // solve the match board: left pronoun -> its ser form on the right
  const leftButtons = page.locator('.grid > div:first-child button')
  const count = await leftButtons.count()
  for (let i = 0; i < count; i++) {
    const pronoun = (await leftButtons.nth(i).textContent())?.trim()
    const form = SER[pronoun]
    if (!form) throw new Error(`unknown pronoun ${pronoun}`)
    await leftButtons.nth(i).click()
    await page.locator('.grid > div:last-child button', { hasText: new RegExp(`^${form}$`) }).click()
  }
  await page.getByText(/Correct!|Cleared/).waitFor()
  await page.screenshot({ path: `${shotDir}/3-match-done.png` })
  await page.getByRole('button', { name: 'Continue' }).click()

  // multiple choice: Tú ___ (ser) -> eres
  await page.getByText('(ser)').waitFor()
  await page.getByRole('button', { name: 'eres', exact: true }).click()
  await page.getByText('Correct!').waitFor()
  await page.screenshot({ path: `${shotDir}/4-mc-correct.png` })

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
