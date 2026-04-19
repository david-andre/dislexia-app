/** One question: syllables to order + correct sequence + audio */
export interface Game2Question {
  /** Syllables shown in scrambled order (drag pool) */
  syllables: string[]
  /** Correct order for validation */
  correctOrder: string[]
  /** Path to audio file for this word */
  audioUrl: string
}

/** Full level content for Game2 */
export interface Game2Level {
  id: string
  title: string
  questions: Game2Question[]
}
