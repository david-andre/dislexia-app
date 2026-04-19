import { describe, it, expect } from 'vitest'
import { getStars } from './utils'

describe('getStars', () => {
  it('returns 3 stars when no incorrect answers', () => {
    expect(getStars(0)).toBe(3)
  })

  it('returns 2 stars when 1 incorrect', () => {
    expect(getStars(1)).toBe(2)
  })

  it('returns 2 stars when 2 incorrect', () => {
    expect(getStars(2)).toBe(2)
  })

  it('returns 1 star when 3 incorrect', () => {
    expect(getStars(3)).toBe(1)
  })

  it('returns 1 star when more than 3 incorrect', () => {
    expect(getStars(4)).toBe(1)
  })
})
