# Game4 Refactor Plan

**Activity:** Identificación Visual  
**Mechanic:** Letter identification — user sees a target letter and taps all matching cards in a grid, ignoring visually similar distractors.

---

## Current State Summary

| File | Content | Issues |
|------|---------|--------|
| `Game4.tsx` | `p` vs `q`, 6 cards (2×3 grid) | SweetAlert2, hardcoded data, calls submitActivity |
| `Game5.tsx` | `m` vs `n`, 9 cards (3×3 grid) | SweetAlert2, hardcoded data, **no submitActivity** |
| `Game6.tsx` | `d` vs `b`, 9 cards (3×3 grid) | SweetAlert2, hardcoded data, **no submitActivity** |

All three games share the **identical mechanic** — only the target letter, distractor letter, and card count differ. They are three levels of the same game living in three separate files.

**Confusable letter pairs targeted (classic dyslexia pairs):**
- `p` / `q` — Level 1 (easier, 6 cards)
- `m` / `n` — Level 2 (harder, 9 cards)
- `d` / `b` — Level 3 (harder, 9 cards)

**Shared bugs across all three:**
- SweetAlert2 for feedback and victory (replace with shared modals)
- Layout uses absolute margins (`ml-96`, `mx-60`) — broken on mobile
- No level select or routing — each game is a dead end back to `/games`
- `validIndices` is hardcoded instead of derived from data
- Game 5 defines `LIST[1]` (d/b data) but never uses it
- Games 5 and 6 missing instructions button and `submitActivity` call

---

## Unified Data Model

Each question: one target letter, one distractor, a flat list of cards.  
`validIndices` is always derived at runtime — never stored.

```typescript
// src/games/game4/types.ts
interface Game4Question {
  targetLetter: string      // Letter to find   ('p')
  distractor: string        // Confusable letter ('q')
  cards: string[]           // All cards in grid order
  cols: 3                   // Grid columns (always 3 for now)
}

interface Game4Level {
  id: string
  title: string
  questions: Game4Question[]
}
```

**Levels mapped from existing games:**
- `game4Level1` — `p/q`, 6 cards  (from Game4.tsx)
- `game4Level2` — `m/n`, 9 cards  (from Game5.tsx)
- `game4Level3` — `d/b`, 9 cards  (from Game6.tsx)

---

## Phase 1: Data Extraction ✓

**Goal:** Move data and types out of the components.

- [x] Create `src/games/game4/`:
  - `types.ts` — `Game4Question`, `Game4Level`
  - `constants.ts` — `ACTIVITY_NAME = 'Identificacion Visual'`, `WINNING_THRESHOLD` (= number of questions in level)
  - `utils.ts` — `getValidIndices(cards, targetLetter): number[]`, `getStars(incorrect): number`
  - `level-data.ts` — `game4Level1`, `game4Level2`, `game4Level3`, `GAME4_LEVELS`
  - `index.ts` — barrel export
- [ ] Map existing hardcoded data:
  - Game4: `LIST` → `game4Level1.questions[0].cards`, derive `validIndices` via `getValidIndices`
  - Game5: `LIST[0]` → `game4Level2.questions[0].cards`
  - Game6: `LIST[0]` → `game4Level3.questions[0].cards`

---

## Phase 2: Component Split ✓

- [x] `Game4Header.tsx`, `TargetDisplay.tsx`, `LetterGrid.tsx`, `index.tsx`
- [x] `game4.css` at `src/views/game4.css`

## Phase 3: Feedback Replacement ✓

- [x] `FeedbackToast`, `VictoryModal`, `InstructionsModal` — SweetAlert2 removed
- [x] Instructions added (were missing in Game5/Game6 equivalents)

## Phase 4: Design & Styling ✓

- [x] `game4.css` with design tokens, CSS Grid 3-col layout, 5.5rem touch targets
- [x] Responsive: fills mobile, capped at 40rem on desktop

## Phase 5: Accessibility ✓

- [x] `aria-pressed` on each card button, `aria-label` per card
- [x] `Enter`/`Space` keyboard toggle on grid cards
- [x] `aria-live="assertive"` region for feedback announcements

## Phase 6: Level Selection & Route Consolidation ✓

- [x] `Game4LevelSelect.tsx` showing level title, letter pair, and earned stars
- [x] `/game4` → `Game4LevelSelect`, `/game4/level/:levelId` → `Game4`
- [x] `/game5` and `/game6` redirect to `/game4`
- [x] `App.tsx` updated, old `Game5`/`Game6` lazy imports removed

## Phase 7: Progress Tracking ✓

- [x] `game4ProgressStore.ts` — persists best stars per child per level
- [x] `setLevelResult` called on `handleVictoryClose`
- [x] Stars shown on level select cards

## Phase 8: useGame4 Hook Extraction ✓

- [x] `src/hooks/useGame4.ts` with all logic extracted
- [x] `UseGame4Result` exported
- [x] `Game4/index.tsx` is a thin UI layer

## Phase 9: Unit Tests ✓

- [x] `games/game4/utils.test.ts` — 8 cases for `getValidIndices` and `getStars`
- [x] `hooks/useGame4.test.tsx` — 10 cases covering toggle, verify, victory, progress save

---

## Execution Order

| Phase | Name                        | Scope |
|-------|-----------------------------|-------|
| 1     | Data extraction             | New `games/game4` module |
| 2     | Component split             | 3–4 new components |
| 3     | Feedback replacement        | Swap Swal → shared modals |
| 4     | Design & styling            | game4.css, mobile grid |
| 5     | Accessibility               | ARIA, keyboard |
| 6     | Level select + consolidation | Merge game4/5/6, update routes |
| 7     | Progress tracking           | Store + UI |
| 8     | useGame4 hook               | Hook + thin view |
| 9     | Unit tests                  | Vitest tests |

---

## Notes

- **`getValidIndices`** eliminates the bug-prone hardcoded `VALID_INDICES` / `INVALID_INDICES`. It simply filters by `card === targetLetter`.
- **Single question per level** (currently). Each level has one question matching the original game. More questions can be added per level later without changing the architecture.
- **`WINNING_THRESHOLD`** for this game is `1` (there is one question per level). Victory fires when `score.correct >= questions.length`.
- **Game 5's unused `LIST[1]`** (`d/b` data) is already captured as `game4Level3` — nothing is lost.
- **Route redirects** for `/game5` and `/game6` preserve any deep links that may exist in the app.
- **Activity name**: Use `'Identificacion Visual'` consistently. Current Game4 uses `'Identificacion Visual 1'` — unify on the shorter name and pass level id for analytics if needed.
