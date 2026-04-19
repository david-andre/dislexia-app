import type { Game4Level } from './types'

/** Level 1 — p vs q, 6 cards (from Game4.tsx) */
export const game4Level1: Game4Level = {
  id: '1',
  title: 'Nivel 1',
  questions: [
    {
      targetLetter: 'p',
      distractor: 'q',
      cards: ['p', 'p', 'q', 'p', 'q', 'p'],
      cols: 3,
    },
  ],
}

/** Level 2 — m vs n, 9 cards (from Game5.tsx) */
export const game4Level2: Game4Level = {
  id: '2',
  title: 'Nivel 2',
  questions: [
    {
      targetLetter: 'm',
      distractor: 'n',
      cards: ['m', 'm', 'n', 'm', 'n', 'm', 'n', 'm', 'n'],
      cols: 3,
    },
  ],
}

/** Level 3 — d vs b, 9 cards (from Game6.tsx) */
export const game4Level3: Game4Level = {
  id: '3',
  title: 'Nivel 3',
  questions: [
    {
      targetLetter: 'd',
      distractor: 'b',
      cards: ['d', 'd', 'b', 'd', 'b', 'd', 'b', 'd', 'b'],
      cols: 3,
    },
  ],
}

export const GAME4_LEVELS: Game4Level[] = [game4Level1, game4Level2, game4Level3]
