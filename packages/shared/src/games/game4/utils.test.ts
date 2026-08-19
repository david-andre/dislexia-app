import { describe, it, expect } from 'vitest'
import { getValidIndices, getStars } from './utils'

describe('getValidIndices', () => {
  it('returns indices of cards matching the target letter', () => {
    expect(getValidIndices(['p', 'p', 'q', 'p', 'q', 'p'], 'p')).toEqual([0, 1, 3, 5])
  })

  it('returns indices for m vs n grid', () => {
    const cards = ['m', 'm', 'n', 'm', 'n', 'm', 'n', 'm', 'n']
    expect(getValidIndices(cards, 'm')).toEqual([0, 1, 3, 5, 7])
  })

  it('returns empty array when no card matches', () => {
    expect(getValidIndices(['q', 'q', 'q'], 'p')).toEqual([])
  })

  it('returns all indices when every card matches', () => {
    expect(getValidIndices(['p', 'p', 'p'], 'p')).toEqual([0, 1, 2])
  })
})

describe('getStars', () => {
  it('returns 3 stars for 0 incorrect', () => {
    expect(getStars(0)).toBe(3)
  })

  it('returns 2 stars for 1 incorrect', () => {
    expect(getStars(1)).toBe(2)
  })

  it('returns 2 stars for 2 incorrect', () => {
    expect(getStars(2)).toBe(2)
  })

  it('returns 1 star for 3+ incorrect', () => {
    expect(getStars(3)).toBe(1)
    expect(getStars(5)).toBe(1)
  })
})
