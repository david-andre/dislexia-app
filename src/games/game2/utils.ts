/** Returns true when the placed syllables match the expected comma-joined order */
export function checkOrder(completedWord: string[], expectedCsv: string): boolean {
  return completedWord.join(',') === expectedCsv
}
