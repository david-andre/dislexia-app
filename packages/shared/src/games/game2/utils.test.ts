import { describe, it, expect } from 'vitest'
import { checkOrder } from './utils'

describe('checkOrder', () => {
  it('returns true when syllables match expected order', () => {
    expect(checkOrder(['CA', 'MI', 'SE', 'TA'], 'CA,MI,SE,TA')).toBe(true)
  })

  it('returns false when syllables are in wrong order', () => {
    expect(checkOrder(['MI', 'CA', 'SE', 'TA'], 'CA,MI,SE,TA')).toBe(false)
  })

  it('returns false when syllables are incomplete', () => {
    expect(checkOrder(['CA', 'MI'], 'CA,MI,SE,TA')).toBe(false)
  })

  it('returns true for a 3-syllable word in correct order', () => {
    expect(checkOrder(['PE', 'CE', 'RA'], 'PE,CE,RA')).toBe(true)
  })

  it('returns false for empty completed word', () => {
    expect(checkOrder([], 'CA,MI,SE,TA')).toBe(false)
  })
})
