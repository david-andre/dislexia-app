# Dislexia App

Web application for dyslexia support in children, based on the **Orton-Gillingham** methodology. Designed for supervisors (parents or teachers) who register children and monitor their progress through educational games.

---

## Overview

The app provides a structured flow:

1. Supervisor logs in or registers
2. Supervisor selects or creates a child profile
3. Child plays one of the educational games
4. Results are stored and used to compute a skill profile
5. Supervisor reviews the child's skill progress in the Profile view

---

## Games

| # | Name | Mechanic | Skills targeted |
|---|------|----------|-----------------|
| Game 1 | Syllable Identification | Tap the card that matches the heard syllable | Phonological Awareness, Auditory Processing |
| Game 2 | Syllable Arrangement | Drag and drop syllables to form the correct word | Phonological Awareness, Sequential Memory |
| Game 3 | Letter Drawing *(TODO)* | Child draws a letter on a canvas; handwriting practice | Visual-motor integration |
| Game 4 | Visual Discrimination | Find all cards matching the target letter (P vs Q, d vs b, etc.) | Visual Discrimination |

Each game has multiple levels with a 3-star rating system. Level results feed into the skills engine.

---

## Skill Engine (Orton-Gillingham based)

Located in `src/skills/`. Pure computation module — no UI dependencies.

Five skills are tracked per child:

| Skill | Source games | Metric |
|-------|-------------|--------|
| Phonological Awareness | Game 1 + Game 2 | Accuracy + precision (stars) |
| Visual Discrimination | Game 4 | Accuracy + precision |
| Sequential Memory | Game 2 | Accuracy + precision |
| Auditory Processing | Game 1 | Accuracy + precision |
| Processing Speed | All games | Accuracy + precision |

Each skill produces:
- **score** (0–100): weighted mean of accuracy and star precision across contributing levels
- **confidence** (0–1): fraction of contributing levels actually played

Skill categories:
- **Strength**: score ≥ 75
- **Developing**: score 45–74
- **Needs Practice**: score < 45
- **No Data**: confidence = 0

---

## Frontend Stack

| Tool | Purpose |
|------|---------|
| Vite + React 18 + TypeScript | Core framework |
| React Router v7 | Client-side routing with lazy loading |
| Zustand | Global state (auth, children, game progress) |
| React Hook Form + Zod | Form validation |
| TanStack Query | Server data fetching (wired to backend) |
| Tailwind CSS + custom CSS | Styling |
| Chart.js | Radar chart in Profile view |
| SweetAlert2 | Confirmation dialogs |

---

## Project Structure

pnpm-workspaces monorepo:

```
apps/web/               # React frontend (@dislexia/web)
packages/shared/        # Platform-neutral TS (@dislexia/shared):
                        #   games/    — level definitions + game logic
                        #   skills/   — Orton-Gillingham skill engine
                        #   contracts/ — Zod API schemas (frontend/backend contract)
apps/api/               # (future) NestJS backend
apps/mobile/            # (future) mobile app
```

`apps/web/src/`:

```
src/
├── assets/
│   └── audio/          # .mp3 files, keyed by filename (see src/audio.ts)
├── components/
│   ├── CardsList/       # Shared syllable card component
│   ├── LevelSelectPage  # Shared level selection screen (used by all games)
│   └── SkillsRadar      # Chart.js radar chart
├── features/
│   └── auth/            # Login / Register form
├── stores/
│   ├── authStore        # Logged-in supervisor
│   ├── childrenStore    # Child profiles (localStorage, per user)
│   ├── game1ProgressStore
│   ├── game2ProgressStore
│   └── game4ProgressStore
├── views/
│   ├── MainPage         # Entry point after login
│   ├── Children         # Child profile CRUD
│   ├── GamesMenu        # Game hub
│   ├── Profile          # Child skill profile + radar chart
│   ├── Game1/           # Syllable identification game
│   ├── Game2/           # Syllable arrangement game
│   ├── Game3            # Letter drawing (TODO)
│   └── Game4/           # Visual discrimination game
└── App.tsx              # Route definitions
```

---

## Data Flow

```
Game session
    └─► Progress store (Zustand + localStorage)
            └─► Skills engine (@dislexia/shared/skills)
                    └─► Profile view (SkillsRadar + skill rows)
```

Currently all data is stored client-side in localStorage. The backend will replace this with persistent server storage.

---

## Backend (planned)

The backend will live in this monorepo at `apps/api` (NestJS + Prisma). Request/response shapes are defined once as Zod schemas in `@dislexia/shared/contracts`. The frontend expects a REST API at `VITE_API_URL` (default `http://localhost:4000`). See `docs/backend.md` for the full plan.

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Supervisor login → returns JWT |
| POST | `/api/auth/register` | Supervisor registration |
| GET | `/api/auth/me` | Current user from token |

### Children

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/children` | List children for logged-in supervisor |
| POST | `/api/children` | Create child profile |
| PUT | `/api/children/:id` | Update child profile |
| DELETE | `/api/children/:id` | Delete child profile |

### Game Results

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/results` | Save a completed level result |
| GET | `/api/results/:childId` | Get all results for a child |

### Profile / Skills

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile/:childId` | Get computed skill profile for a child |

### Suggested child result payload

```json
{
  "childId": "string",
  "game": "game1" | "game2" | "game4",
  "levelId": "string",
  "correct": 8,
  "incorrect": 2,
  "stars": 3,
  "playedAt": "ISO timestamp"
}
```

---

## Local Setup

### Requirements

- Node.js 20+
- pnpm 11+ (`npm install -g pnpm`)

### Install & run (from the repo root)

```bash
pnpm install
cp apps/web/.env.example apps/web/.env   # set VITE_API_URL
pnpm dev               # http://localhost:5173
```

### Build & test

```bash
pnpm build             # builds all packages
pnpm test              # tests all packages
pnpm lint
```

---

## Design Principles

- **Spanish-first**: all UI text is in Spanish
- **Dyslexia-friendly UI**: large touch targets (44px+), high contrast, generous spacing, "Luckiest Guy" display font for game numbers
- **Child-centric data model**: every game result and skill score is scoped to a specific child, not the supervisor
- **Evidence-based scoring**: skill computation is grounded in Orton-Gillingham assessment principles, not arbitrary points
