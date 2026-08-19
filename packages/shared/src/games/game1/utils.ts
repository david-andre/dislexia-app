/** Stars earned based on incorrect count: 0 => 3, 1-2 => 2, 3+ => 1 */
export function getStars(incorrect: number): number {
  if (incorrect > 2) return 1
  if (incorrect === 0) return 3
  return 2
}
