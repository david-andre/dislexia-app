import { describe, it, expect } from 'vitest'
import { computeSkillProfile } from './engine'
import type { GameProgress } from './types'

const NONE: GameProgress = {}

const PERFECT_G1: GameProgress = {
  '1': { stars: 3, correct: 5, incorrect: 0 },
  '2': { stars: 3, correct: 5, incorrect: 0 },
}

const PERFECT_G2: GameProgress = {
  '1': { stars: 3, correct: 5, incorrect: 0 },
  '2': { stars: 3, correct: 5, incorrect: 0 },
}

const PERFECT_G4: GameProgress = {
  '1': { stars: 3, correct: 1, incorrect: 0 },
  '2': { stars: 3, correct: 1, incorrect: 0 },
  '3': { stars: 3, correct: 1, incorrect: 0 },
}

describe('computeSkillProfile', () => {
  // ── No data ─────────────────────────────────────────────────────────────

  it('all scores are 0 and confidence 0 when nothing played', () => {
    const p = computeSkillProfile(NONE, NONE, NONE)
    for (const score of Object.values(p)) {
      expect(score.score).toBe(0)
      expect(score.confidence).toBe(0)
    }
  })

  // ── Perfect play ─────────────────────────────────────────────────────────

  it('all scores are 100 when every level is 3-star perfect', () => {
    const p = computeSkillProfile(PERFECT_G1, PERFECT_G2, PERFECT_G4)
    for (const score of Object.values(p)) {
      expect(score.score).toBe(100)
      expect(score.confidence).toBe(1)
    }
  })

  // ── Phonological Awareness ───────────────────────────────────────────────

  it('phonologicalAwareness uses accuracy from game1 and game2', () => {
    const g1: GameProgress = { '1': { stars: 2, correct: 4, incorrect: 1 } }
    const g2: GameProgress = { '1': { stars: 2, correct: 3, incorrect: 1 } }
    const p = computeSkillProfile(g1, g2, NONE)
    // g1 accuracy = 4/5 = 0.8, g2 accuracy = 3/4 = 0.75, avg = 0.775 → 78
    expect(p.phonologicalAwareness.score).toBe(78)
    expect(p.phonologicalAwareness.confidence).toBe(2 / 4) // 2 of 4 levels played
  })

  it('phonologicalAwareness confidence is 1 when all 4 levels played', () => {
    const p = computeSkillProfile(PERFECT_G1, PERFECT_G2, NONE)
    expect(p.phonologicalAwareness.confidence).toBe(1)
  })

  // ── Visual Discrimination ─────────────────────────────────────────────────

  it('visualDiscrimination weights level 3 highest', () => {
    // Only level 3 played, perfect
    const g4: GameProgress = { '3': { stars: 3, correct: 1, incorrect: 0 } }
    const p = computeSkillProfile(NONE, NONE, g4)
    expect(p.visualDiscrimination.score).toBe(100)
    expect(p.visualDiscrimination.confidence).toBe(1 / 3)
  })

  it('visualDiscrimination is lower when harder level has worse accuracy', () => {
    const g4Easy: GameProgress = {
      '1': { stars: 3, correct: 1, incorrect: 0 }, // 100% weight 1.0
      '2': { stars: 3, correct: 1, incorrect: 0 }, // 100% weight 1.2
      '3': { stars: 1, correct: 0, incorrect: 1 }, // 0%   weight 1.5
    }
    const p = computeSkillProfile(NONE, NONE, g4Easy)
    // weighted: (1.0×1 + 1.2×1 + 1.5×0) / (1.0+1.2+1.5) = 2.2/3.7 ≈ 0.595 → 59
    expect(p.visualDiscrimination.score).toBe(59)
    expect(p.visualDiscrimination.confidence).toBe(1)
  })

  // ── Sequential Memory ─────────────────────────────────────────────────────

  it('sequentialMemory is based on stars (precision) from game2', () => {
    const g2: GameProgress = {
      '1': { stars: 2, correct: 5, incorrect: 3 }, // precision = 2/3
      '2': { stars: 1, correct: 5, incorrect: 7 }, // precision = 1/3
    }
    const p = computeSkillProfile(NONE, g2, NONE)
    // avg precision = (2/3 + 1/3) / 2 = 0.5 → 50
    expect(p.sequentialMemory.score).toBe(50)
  })

  it('sequentialMemory score is 0 when game2 not played', () => {
    const p = computeSkillProfile(PERFECT_G1, NONE, PERFECT_G4)
    expect(p.sequentialMemory.score).toBe(0)
    expect(p.sequentialMemory.confidence).toBe(0)
  })

  // ── Auditory Processing ───────────────────────────────────────────────────

  it('auditoryProcessing is based on stars from game1', () => {
    const g1: GameProgress = {
      '1': { stars: 3, correct: 5, incorrect: 0 }, // precision 1.0
      '2': { stars: 0, correct: 0, incorrect: 0 }, // precision 0 — played but 0 stars
    }
    const p = computeSkillProfile(g1, NONE, NONE)
    // avg precision = (1.0 + 0.0) / 2 = 0.5 → 50
    expect(p.auditoryProcessing.score).toBe(50)
  })

  // ── Processing Speed ──────────────────────────────────────────────────────

  it('processingSpeed averages stars across all 7 levels', () => {
    // 3 levels with 3 stars, 4 levels not played
    const g1: GameProgress = {
      '1': { stars: 3, correct: 5, incorrect: 0 },
    }
    const p = computeSkillProfile(g1, NONE, NONE)
    // 1 played level, precision = 1.0 → score 100, confidence 1/7
    expect(p.processingSpeed.score).toBe(100)
    expect(p.processingSpeed.confidence).toBeCloseTo(1 / 7)
  })

  it('processingSpeed confidence is 1 when all 7 levels played', () => {
    const p = computeSkillProfile(PERFECT_G1, PERFECT_G2, PERFECT_G4)
    expect(p.processingSpeed.confidence).toBe(1)
  })
})
