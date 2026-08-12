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

- **Curriculum:** Spanish A1 units 1–2 (11 topics) and German A1 units 1–2 (12 topics), each with
  explanations, paradigm tables, and drills; 11 thematic vocab packs (~120 words per language so far).
- **Engines:** Spanish conjugator (regular/irregular/stem-changing) + article/plural/adjective
  agreement; German conjugator (vowel change, e-insertion, s-merge, separable prefixes, perfect) +
  full case decliner (der/ein/kein/possessive × nom/acc/dat, n-declension, dative-plural -n).
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

## Roadmap

- Spanish/German units 3–6 (the curriculum design covers A1→A2: preterite, dative, perfect,
  subordinate clauses…)
- Dark mode, error-spotting exercise type, review-forecast chart, test-out quizzes for topics.
