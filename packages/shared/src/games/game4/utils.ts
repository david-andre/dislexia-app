/** Indices in `cards` that match the target letter — replaces hardcoded VALID_INDICES */
export function getValidIndices(cards: string[], targetLetter: string): number[] {
  return cards.reduce<number[]>((acc, card, i) => {
    if (card === targetLetter) acc.push(i)
    return acc
  }, [])
}

/** Stars earned: 0 incorrect = 3, 1–2 = 2, 3+ = 1 */
export function getStars(incorrect: number): number {
  if (incorrect === 0) return 3
  if (incorrect <= 2) return 2
  return 1
}
