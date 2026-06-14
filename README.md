# Ner Zikaron — A Candle of Remembrance

A quiet companion for the yahrzeit. Built with Next.js, React, Framer Motion, and Tailwind.

## Run it locally

You need Node.js (v18+). Then, in this folder:

```
npm install
npm run dev
```

Open http://localhost:3000 in your browser. The candle is best seen here — its flame flickers and glows.

## What's inside
- `app/page.js` — the candle intro + guided journey
- `app/tools/page.js` — the yahrzeit date calculator (tucked away)
- `app/words/page.js` — Kaddish, Kel Malei, Yizkor, the bracha, and all 8 Tehillim
- `app/give/page.js` — tzedakah in their memory
- `app/visit/page.js` — visiting the kever
- `components/Candle.jsx` — the animated candle
- `lib/` — the verified Hebrew calendar engine + authentic texts

## Deploy
This runs on Vercel as-is (`npm run build`). No configuration needed.
