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
| React Router v6 | Client-side routing with lazy loading |
| Zustand | Global state (auth, children, game progress) |
| React Hook Form + Zod | Form validation |
| TanStack Query | Server data fetching (wired to backend) |
| Tailwind CSS + custom CSS | Styling |
| Chart.js | Radar chart in Profile view |
| SweetAlert2 | Confirmation dialogs |

---

## Project Structure

```
src/
├── assets/
│   └── audio/          # .mp3 files for syllable audio (Game 1)
├── components/
│   ├── CardsList/       # Shared syllable card component
│   ├── LevelSelectPage  # Shared level selection screen (used by all games)
│   └── SkillsRadar      # Chart.js radar chart
├── features/
│   └── auth/            # Login / Register form
├── games/               # Level definitions per game
├── skills/              # Orton-Gillingham skill computation engine
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
            └─► Skills engine (src/skills/)
                    └─► Profile view (SkillsRadar + skill rows)
```

Currently all data is stored client-side in localStorage. The backend will replace this with persistent server storage.

---

## Backend (planned)

The backend lives in a separate repository. The frontend expects a REST API at `VITE_API_URL` (default `http://localhost:4000`).

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

- Node.js 18+
- npm or pnpm

### Install & run

```bash
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev            # http://localhost:5173
```

### Build

```bash
npm run build
npm run preview
```

---

## Design Principles

- **Spanish-first**: all UI text is in Spanish
- **Dyslexia-friendly UI**: large touch targets (44px+), high contrast, generous spacing, "Luckiest Guy" display font for game numbers
- **Child-centric data model**: every game result and skill score is scoped to a specific child, not the supervisor
- **Evidence-based scoring**: skill computation is grounded in Orton-Gillingham assessment principles, not arbitrary points
