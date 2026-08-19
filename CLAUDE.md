# Dislexia App — Claude Briefing

Web app for dyslexia support in children. Supervisors (parents/teachers) register child profiles and children play educational games. Game results feed a skill engine that computes an Orton-Gillingham skill profile per child.

## Current state (as of 2026-08-19)

- Frontend: complete and working (React + Vite + TypeScript)
- Backend: **not yet built** — all data lives in localStorage via Zustand stores.
  The user is building it himself in NestJS + Prisma (see `docs/backend.md`)
- Auth: form exists but API calls not wired (sets a dummy user; demo mode bypasses login)
- Game 3: UI placeholder only — the game is planned as a letter-drawing activity

## Repository layout (pnpm workspaces monorepo)

```
apps/web/          — the Vite React app (@dislexia/web)
packages/shared/   — platform-neutral TypeScript (@dislexia/shared):
                     game level data + logic, skills engine, Zod API contracts
apps/api/          — (future) NestJS backend, built by the user
apps/mobile/       — (future) mobile app
```

- Run everything from the root: `pnpm dev`, `pnpm test`, `pnpm build`, `pnpm lint`
- `@dislexia/shared` exports subpaths: `/game1`, `/game2`, `/game4`, `/skills`, `/contracts`.
  It is consumed as TypeScript source (no build step); it must stay free of
  DOM/React/Node APIs and bundler-specific imports
- Audio: shared level data carries `audioKey` (e.g. `'camiseta'`); each client maps
  keys to playable URLs (web: `apps/web/src/audio.ts` via `import.meta.glob`)

## User flow

```
Login → /children (select or create child) → /games (hub) → /gameN/level/:levelId
                                                           → /profile (skill radar)
```

## Key architectural rules

- All game progress is stored **per child**: `byChild[childId][levelId] = { stars, correct, incorrect }`
- Progress stores keep **best result only** (never overwrite a higher-star result)
- Game and profile routes require a selected child (`<ProtectedRoute requireChild>`);
  progress is never recorded without one
- Skills are computed **pure client-side** in `packages/shared/src/skills/engine.ts` — no backend dependency (the backend will reuse the same engine)
- All UI text is in **Spanish**

## Stores (Zustand + localStorage)

| Store | Key | What it holds |
|-------|-----|---------------|
| `authStore` | `dislexia-auth:v1` | Logged-in supervisor + selectedChild |
| `childrenStore` | `dislexia-children:v1` | Children array keyed by userId |
| `game1ProgressStore` | `dislexia-game1-progress` | byChild progress |
| `game2ProgressStore` | `dislexia-game2-progress` | byChild progress |
| `game4ProgressStore` | `dislexia-game4-progress` | byChild progress |

The three game progress stores are instances of `createGameProgressStore()`
(`apps/web/src/stores/createGameProgressStore.ts`) — same shape and best-result rule, different key.

## Games summary

| Route | Game | Mechanic | Winning condition |
|-------|------|----------|-------------------|
| `/game1/level/:levelId` | Syllable ID | Tap the correct missing syllable | 5 correct answers |
| `/game2/level/:levelId` | Syllable order | Drag & drop syllables into correct order | 5 correct answers |
| `/game3` | Letter drawing | Draw the letter on canvas (TODO) | — |
| `/game4/level/:levelId` | Visual discrimination | Tap all cards matching target letter | 1 question per level |

## Skills engine (`packages/shared/src/skills/`)

5 skills, each is `{ score: 0-100, confidence: 0-1 }`. See `docs/skills.md` for full formulas.

| Skill | Source | Metric used |
|-------|--------|------------|
| Phonological Awareness | Game1 L1+L2, Game2 L1+L2 | accuracy |
| Visual Discrimination | Game4 L1+L2+L3 | accuracy (weighted) |
| Sequential Memory | Game2 L1+L2 | precision (stars/3) |
| Auditory Processing | Game1 L1+L2 | precision (stars/3) |
| Processing Speed | All 7 levels | precision (stars/3) |

## Stars formula (all games)

- 0 wrong → 3 stars
- 1–2 wrong → 2 stars
- 3+ wrong → 1 star

## Docs index

- `docs/methodology.md` — Orton-Gillingham basis, game design rationale
- `docs/skills.md` — exact scoring formulas with worked examples
- `docs/backend.md` — NestJS backend plan, data model, API contract
- `docs/decisions.md` — pending improvements and technical debt to address later
- `README.md` — project overview for new contributors

## Tech stack

pnpm workspaces · Vite 8 · React 18 · TypeScript · React Router v7 · Zustand · TanStack Query · React Hook Form + Zod · Tailwind CSS · Chart.js · SweetAlert2

## Collaboration model

Claude does all frontend work (web + future mobile). The user builds the backend
(NestJS + Prisma) and CI/CD himself as a learning project — Claude mentors and
reviews backend code but does not write it.
