export interface Game4Question {
  targetLetter: string
  distractor: string
  cards: string[]
  cols: 3
}

export interface Game4Level {
  id: string
  title: string
  questions: Game4Question[]
}
