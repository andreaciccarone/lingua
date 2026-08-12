# Lingua

Grammar-first Spanish & German learning app. Offline-first PWA: runs locally on the Mac and
installs to the iPhone home screen.

## Develop

```sh
npm install
npm run dev        # local dev server
npm test           # engine unit tests
npm run preview    # test the real built PWA + service worker
```

## Deploy

Push to `main` — GitHub Actions builds and deploys to GitHub Pages.

## iPhone install (one time)

Open the GitHub Pages URL in Safari → Share → **Add to Home Screen**. The app then works fully
offline. After a deploy, close and reopen the app twice to pick up the update.
