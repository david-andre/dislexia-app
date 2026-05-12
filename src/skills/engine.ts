/**
 * Orton-Gillingham skill engine.
 *
 * Pure functions — no React, no stores. Takes raw GameProgress objects and
 * returns a SkillProfile. All formulas are documented inline so they can be
 * reviewed and adjusted by educators.
 *
 * Data available per level: { stars (1–3), correct, incorrect }
 *
 * Two derived primitives used throughout:
 *   accuracy  = correct / (correct + incorrect)   → measures answer quality
 *   precision = stars / 3                          → measures consistency
 *                                                    (penalises retries more)
 */

import type { GameProgress, LevelResult, SkillProfile, SkillScore } from './types'

// ── Primitives ───────────────────────────────────────────────────────────────

function accuracy(r: LevelResult | undefined): number | null {
  if (!r) return null
  const total = r.correct + r.incorrect
  return total === 0 ? null : r.correct / total
}

function precision(r: LevelResult | undefined): number | null {
  if (!r) return null
  return r.stars / 3
}

/**
 * Weighted mean of (value, weight) pairs, skipping nulls.
 * Returns the mean and the confidence (fraction of non-null entries).
 */
function wmean(
  entries: Array<[number | null, number]>,
): { value: number | null; confidence: number } {
  const played = entries.filter((e): e is [number, number] => e[0] !== null)
  const confidence = played.length / entries.length
  if (played.length === 0) return { value: null, confidence: 0 }
  const totalWeight = played.reduce((s, [, w]) => s + w, 0)
  const value = played.reduce((s, [v, w]) => s + v * w, 0) / totalWeight
  return { value, confidence }
}

function toScore(raw: { value: number | null; confidence: number }): SkillScore {
  return {
    score: raw.value === null ? 0 : Math.round(Math.min(raw.value, 1) * 100),
    confidence: raw.confidence,
  }
}

// ── Skill computations ───────────────────────────────────────────────────────

/**
 * CONCIENCIA FONOLÓGICA
 * OG basis: phonological awareness — segmenting and blending syllables.
 * Sources: Game 1 (choose correct syllable) + Game 2 (arrange syllables).
 * Both games test syllable manipulation; accuracy reflects answer quality.
 * Equal weight between games.
 */
function phonologicalAwareness(g1: GameProgress, g2: GameProgress): SkillScore {
  const g1avg = wmean([
    [accuracy(g1['1']), 1],
    [accuracy(g1['2']), 1],
  ])
  const g2avg = wmean([
    [accuracy(g2['1']), 1],
    [accuracy(g2['2']), 1],
  ])
  const combined = wmean([
    [g1avg.value, 1],
    [g2avg.value, 1],
  ])
  const allLevels = [g1['1'], g1['2'], g2['1'], g2['2']]
  const confidence = allLevels.filter(Boolean).length / allLevels.length
  return toScore({ value: combined.value, confidence })
}

/**
 * DISCRIMINACIÓN VISUAL
 * OG basis: visual processing of graphemes — distinguishing mirror/rotational
 * letter pairs that are the primary source of reading confusion in dyslexia.
 * Source: Game 4 only.
 * Weights: Level 1 p/q (1.0) < Level 2 m/n (1.2) < Level 3 d/b (1.5)
 * because d/b involves both rotation and mirror confusion simultaneously.
 */
function visualDiscrimination(g4: GameProgress): SkillScore {
  return toScore(
    wmean([
      [accuracy(g4['1']), 1.0],
      [accuracy(g4['2']), 1.2],
      [accuracy(g4['3']), 1.5],
    ]),
  )
}

/**
 * MEMORIA SECUENCIAL
 * OG basis: phonological working memory — holding and ordering sound sequences.
 * Source: Game 2 (explicit syllable ordering task).
 * Uses precision (stars) rather than accuracy because stars penalise extra
 * attempts, which directly reflects working-memory breakdown.
 */
function sequentialMemory(g2: GameProgress): SkillScore {
  return toScore(
    wmean([
      [precision(g2['1']), 1],
      [precision(g2['2']), 1],
    ]),
  )
}

/**
 * PROCESAMIENTO AUDITIVO
 * OG basis: auditory decoding — using sound cues to map phonemes to graphemes.
 * Source: Game 1 (has audio for each word; success requires listening to
 * the spoken word and identifying the matching syllable).
 * Uses precision (stars) to reward consistent correct listening.
 */
function auditoryProcessing(g1: GameProgress): SkillScore {
  return toScore(
    wmean([
      [precision(g1['1']), 1],
      [precision(g1['2']), 1],
    ]),
  )
}

/**
 * VELOCIDAD DE RESPUESTA
 * OG basis: automaticity — fluent, low-effort processing across all skill areas.
 * Source: stars across all levels of all games.
 * Stars are the best single proxy for automaticity: 3 stars means the child
 * answered correctly with minimal retries, indicating automatic recognition.
 */
function processingSpeed(
  g1: GameProgress,
  g2: GameProgress,
  g4: GameProgress,
): SkillScore {
  return toScore(
    wmean([
      [precision(g1['1']), 1],
      [precision(g1['2']), 1],
      [precision(g2['1']), 1],
      [precision(g2['2']), 1],
      [precision(g4['1']), 1],
      [precision(g4['2']), 1],
      [precision(g4['3']), 1],
    ]),
  )
}

// ── Public API ───────────────────────────────────────────────────────────────

export function computeSkillProfile(
  g1: GameProgress,
  g2: GameProgress,
  g4: GameProgress,
): SkillProfile {
  return {
    phonologicalAwareness: phonologicalAwareness(g1, g2),
    visualDiscrimination: visualDiscrimination(g4),
    sequentialMemory: sequentialMemory(g2),
    auditoryProcessing: auditoryProcessing(g1),
    processingSpeed: processingSpeed(g1, g2, g4),
  }
}
