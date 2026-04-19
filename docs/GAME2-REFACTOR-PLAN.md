# Game2 Refactor Plan

**Activity:** Conciencia Fonológica 1  
**Mechanic:** Drag-and-drop syllable ordering – user hears a word and arranges syllables in the correct order.

---

## Current State Summary

- **Location:** `src/views/Game2.tsx` (single 234-line file)
- **Dependencies:** SweetAlert2, hardcoded data (INITIAL_TASKS, OPTIONS, CORRECT_WORDS, AUDIO_BY_INDEX)
- **Styling:** `game2.css` + reuses `.g1` classes from Game1
- **Structure:** Monolithic component with drag/drop logic, validation, and UI inline

---

## Phase 1: Data Extraction ✓

**Goal:** Move data and types out of the component.

- [x] Create `src/games/game2/`:
  - `types.ts` – `Game2Level`, `Game2Question`
  - `constants.ts` – `ACTIVITY_NAME`, `WINNING_THRESHOLD`
  - `level-data.ts` – `game2Level1` with questions (syllables, correct order, audio URL)
- [x] Map current structure:
  - Each question = syllables to order + correct sequence + audio
  - INITIAL_TASKS → first question's syllables
  - OPTIONS → subsequent questions
  - CORRECT_WORDS → expected comma-joined strings
- [x] Export from `src/games/game2/index.ts`

---

## Phase 2: Component Split ✓

**Goal:** Break into smaller, reusable components.

- [x] Create `src/views/Game2/`:
  - `Game2Header.tsx` – back button, instructions, score (mirror Game1Header)
  - `SyllableSourceArea.tsx` – draggable syllable cards (in-progress pool)
  - `SyllableTargetArea.tsx` – droppable "Aquí" zone with completed syllables
  - `Game2AudioButton.tsx` – play-audio button
  - `index.tsx` – orchestrator
- [x] Keep `game2.css` at `src/views/game2.css`, import from Game2/index

---

## Phase 3: Feedback Replacement ✓

**Goal:** Replace SweetAlert2 with shared components.

- [x] Use `FeedbackToast` for success ("Bien hecho") and error ("Inténtalo de nuevo")
- [x] Use `VictoryModal` for end-of-game (stars, correct/incorrect, continue button)
- [x] Use `InstructionsModal` for game instructions (drag-and-drop copy)
- [x] Remove SweetAlert2 from Game2 (still used elsewhere in app)

---

## Phase 4: Design & Styling ✓

**Goal:** Dyslexia-friendly, consistent with Game1 patterns.

- [x] Define Game2 design tokens in `game2.css`:
  - Background, surface, accent colors
  - Drag source/target styling (replace dotted-red borders)
- [x] Improve layout: spacing, hierarchy, touch targets
- [x] Add progress dots or similar indicator
- [x] Ensure drag handles/cards meet min touch target size

---

## Phase 5: Accessibility ✓

**Goal:** Keyboard, screen reader, and focus support.

- [x] Add keyboard drag alternative (arrow keys or tab + activate to "pick" syllable, then choose slot)
- [x] Or: provide non-drag fallback (e.g. click-to-select order) for accessibility
- [x] ARIA labels for drag zones, cards, audio button
- [x] Focus management in modals (reuse patterns from Game1)
- [x] Live region for feedback announcements

---

## Phase 6: Multiple Levels & Level Selection ✓

**Goal:** Support multiple levels like Game1.

- [x] Add level metadata (id, title)
- [x] Create `game2Level2` (same words, different scramble order)
- [x] Create `Game2LevelSelect.tsx` – level picker screen
- [x] Route: `/game2` → level select, `/game2/level/:levelId` → play
- [x] Update `App.tsx` routes

---

## Phase 7: Progress Tracking ✓

**Goal:** Persist completion and show progress.

- [x] Create `game2ProgressStore` (or extend shared progress store)
- [x] Save stars on victory
- [x] Show completion stars on level select cards
- [x] Persist to localStorage (keyed by child)

---

## Phase 8: useGame2 Hook Extraction ✓

**Goal:** Separate logic from UI.

- [x] Create `useGame2(levelId)` in `src/hooks/useGame2.ts`:
  - State: tasks, options, pendingAnswers, completedWord, score
  - Handlers: onDragStart, onDragOver, onDrop, playAudio, addSyllableToTarget, undoLastSyllable
  - Victory detection, feedback, a11y announcements
- [x] Refactor `Game2/index.tsx` to use hook (thin UI layer)
- [x] Export `UseGame2Result` type

---

## Phase 9: Unit Tests ✓

**Goal:** Cover game logic.

- [x] Extract pure helpers to `games/game2/utils.ts` (`checkOrder`)
- [x] Add tests for `checkOrder` in `games/game2/utils.test.ts`
- [x] Add tests for `useGame2` in `hooks/useGame2.test.tsx` (12 cases)

---

## Phase 10: Drag-and-Drop Improvements ✓

**Goal:** More robust drag UX.

- [x] Kept native HTML5 drag (click/keyboard fallback already handles touch + a11y)
- [x] Drag-over highlight on target zone (`onDragEnter`/`onDragLeave` with child-check)
- [x] Source card fades while being dragged (`draggingTaskName` local state)
- [x] Green flash on word preview on correct drop (`g2-flash-correct` keyframe)
- [x] Horizontal shake on source zone on incorrect drop (`g2-shake` keyframe)

---

## Execution Order

Phases 1–9 follow the same order as Game1. Phase 10 can be done later if needed.

| Phase | Name                    | Est. scope      |
|-------|-------------------------|-----------------|
| 1     | Data extraction         | New `games/game2` module |
| 2     | Component split         | 4–5 new components |
| 3     | Feedback replacement    | Swap Swal → shared modals |
| 4     | Design & styling        | game2.css redesign |
| 5     | Accessibility           | Keyboard, ARIA |
| 6     | Multiple levels         | Level select + routing |
| 7     | Progress tracking       | Store + UI |
| 8     | useGame2 hook           | Hook + thin view |
| 9     | Unit tests              | Vitest tests |
| 10    | (Optional) DnD improvements | Library or polish |

---

## Notes

- **Drag vs keyboard:** Phase 5 may require a non-drag interaction path (e.g. click to place) for full accessibility.
- **Shared components:** Reuse `Game1Header` if structure matches, or create `Game2Header` with game-specific layout.
- **Activity name:** `'Conciencia Fonologica 1'` – keep consistent for API/analytics.
