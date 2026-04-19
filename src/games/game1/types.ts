/** Single option the child can tap (e.g. MI, TI, NI) */
export interface WordOption {
  text: string
  /** true if this is the correct answer */
  isCorrect?: boolean
}

/** One word/question in the level: syllables with blank, options, and audio */
export interface LevelQuestion {
  /** Syllables to display, use '' for the blank slot */
  syllables: string[]
  /** Answer options; one must have isCorrect: true */
  options: WordOption[]
  /** Path to audio file for this word */
  audioUrl: string
}

/** Full level content for Game1 */
export interface Game1Level {
  id: string
  title: string
  questions: LevelQuestion[]
}
