# Lingua

Grammar-first Spanish & German learning app — the anti-Duolingo: every lesson opens with a real
grammar explanation (conjugation and case tables), drills it with generated exercises whose wrong
answers are *diagnostic* (each distractor encodes a specific mistake — wrong person ending, wrong
case, missed stem change — so errors get targeted feedback), and schedules review with spaced
repetition per grammar skill and per word.

Offline-first PWA: runs locally on a Mac and installs to the iPhone home screen. No accounts, no
backend — all progress in on-device IndexedDB.

**Live:** https://andreaciccarone.github.io/lingua/

## What's inside

- **Curriculum:** two complete A1→A2 courses — Spanish (7 units, 34 topics: noun gender through
  preterite, imperfect, present perfect, imperative and por/para) and German (7 units, 33 topics:
  der/die/das through the Perfekt, adjective endings, past modals, werden-future and subordinate
  clauses). Every topic has an explanation, paradigm tables, worked examples and generated drills.
  37 thematic vocab packs; lexicons: es 353 words (83 verbs/211 nouns/59 adjectives),
  de 298 words (64 verbs/203 nouns/31 adjectives) — every word with Italian glosses.
- **Engines:** Spanish conjugator — present, preterite, imperfect (era/iba/veía) and present
  perfect (haber + participles incl. hecho/visto/escrito), with stem changes, yo-irregulars,
  spelling rules and reflexives — plus article/plural/adjective agreement; German conjugator
  (vowel change, e-insertion, s-merge, separable prefixes, modals incl. Präteritum konnte/musste,
  werden, Perfekt with wrongAux drills) + full case decliner (der/ein/kein/possessive ×
  nom/acc/dat, n-declension, dative-plural -n) + attributive adjective endings
  (weak/mixed/strong).
  The same engines render the explanation tables and generate the drills, so they can never disagree.
- **SRS:** SM-2-lite with automatic grading; the card is a grammar *skill* (e.g. "tú-form of -ar
  verbs", "accusative masculine"), so reviews always get freshly generated exercises.
- **Exercises:** multiple choice, typed cloze (accent bar, morpheme-aware typo tolerance),
  match pairs, word-order tiles (German V2!), flashcards, listening (device TTS).
- **Extras:** streaks with earned freezes, XP goals, per-topic mastery, weakest-skill drills,
  JSON backup/restore, per-language TTS voice picker.

## Develop

```sh
npm install
npm run dev        # local dev server (Mac)
npm test           # engine unit tests (conjugators, decliner, SRS, grading, streaks)
npm run build      # type-check + production build + service worker
npm run preview    # test the real built PWA + service worker locally
node scripts/smoke.mjs   # headless end-to-end: plays lessons in both languages (needs Chrome + `npm run dev` running)
```

Content lives in `src/content/{es,de}/` as typed TypeScript literals — `tsc` validates the
curriculum. IDs are append-only: renaming a topic/lexeme id orphans saved SRS progress.

## Deploy

Push to `main` → GitHub Actions builds and deploys to GitHub Pages. That's it.

## iPhone rituals

- **Install (once):** open the live URL in Safari → Share → **Add to Home Screen**. Works fully
  offline afterwards.
- **Update:** after a deploy, close and reopen the app twice — iOS fetches the new version on
  launch and applies it on the next one.
- **Backup:** Settings → *Export backup (JSON)* → share it to Files/iCloud now and then. Progress
  lives only on the device; restore via *Import backup*.
- **Voices:** if speaker buttons are missing, install voices under iOS Settings → Accessibility →
  Spoken Content → Voices (Mónica/Paulina for Spanish, Anna/Helena for German work well).

## Language

The app is bilingual in its *instruction* language: Italian by default, English on a toggle in
Settings. Explanations, glosses, hints and UI are all localized; generated exercise prompts are
rendered by a small Italian morphology layer (`src/i18n/gloss-it.ts`) that conjugates gloss verbs,
including the passato prossimo used for Spanish preterite drills.

## Content invariants

`src/content/content.test.ts` is a build-time validator over all authored content: dependency
ordering on the path, every drilled cell declared, every lexeme id resolvable, authored exercises
well formed (one correct option, ≥3 options, unambiguous match boards), every skill regenerating a
review exercise, and every topic building a playable lesson in both instruction languages. Adding
content without satisfying these fails `npm test`, and therefore the deploy.

## Roadmap

- Dark mode, error-spotting exercise type, review-forecast chart, test-out quizzes for topics
- B1 track (subjunctive, Konjunktiv II, relative clauses…) whenever A2 feels solid.
