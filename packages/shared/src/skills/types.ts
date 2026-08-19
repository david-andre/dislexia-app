// Orton-Gillingham skill areas mapped to the app's three games

export const SKILL_KEYS = [
  'phonologicalAwareness',
  'visualDiscrimination',
  'sequentialMemory',
  'auditoryProcessing',
  'processingSpeed',
] as const

export type SkillKey = (typeof SKILL_KEYS)[number]

export interface SkillScore {
  /** 0–100. 0 also covers "not played" — check confidence to distinguish. */
  score: number
  /** 0–1: fraction of contributing levels that have been played. */
  confidence: number
}

export type SkillProfile = Record<SkillKey, SkillScore>

/** Shared shape for a completed game level (all three stores use this). */
export interface LevelResult {
  stars: number
  correct: number
  incorrect: number
}

/** levelId → best result. Absent key means the level was never played. */
export type GameProgress = Partial<Record<string, LevelResult>>

export const SKILL_META: Record<
  SkillKey,
  { label: string; description: string; color: string; totalLevels: number }
> = {
  phonologicalAwareness: {
    label: 'Conciencia Fonológica',
    description: 'Identificar y manipular sílabas dentro de las palabras',
    color: 'rgba(59, 130, 246, 0.85)',
    totalLevels: 4, // Game1 L1+L2, Game2 L1+L2
  },
  visualDiscrimination: {
    label: 'Discriminación Visual',
    description: 'Distinguir letras visualmente similares (p/q, m/n, d/b)',
    color: 'rgba(245, 158, 11, 0.85)',
    totalLevels: 3, // Game4 L1+L2+L3
  },
  sequentialMemory: {
    label: 'Memoria Secuencial',
    description: 'Recordar y reproducir el orden correcto de sílabas',
    color: 'rgba(16, 185, 129, 0.85)',
    totalLevels: 2, // Game2 L1+L2
  },
  auditoryProcessing: {
    label: 'Procesamiento Auditivo',
    description: 'Usar pistas sonoras para identificar y completar palabras',
    color: 'rgba(139, 92, 246, 0.85)',
    totalLevels: 2, // Game1 L1+L2
  },
  processingSpeed: {
    label: 'Velocidad de Respuesta',
    description: 'Responder con precisión y mínimos intentos en todos los juegos',
    color: 'rgba(239, 68, 68, 0.85)',
    totalLevels: 7, // all levels across all three games
  },
}
