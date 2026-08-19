/**
 * API contract shared between the frontend(s) and the NestJS backend.
 *
 * These Zod schemas are the single source of truth: the backend validates
 * request bodies against them, and both sides infer their TypeScript types
 * from them. See docs/backend.md for the endpoint table.
 */
import { z } from 'zod'

// ── Auth ─────────────────────────────────────────────────────────────────────

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
})

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
})

// ── Children ─────────────────────────────────────────────────────────────────

export const createChildSchema = z.object({
  nombre: z.string().trim().min(1).max(100),
  apellido: z.string().trim().max(100).optional(),
  edad: z.number().int().min(3).max(18).optional(),
})

export const updateChildSchema = createChildSchema

export const childSchema = createChildSchema.extend({
  id: z.string().uuid(),
})

// ── Game results ─────────────────────────────────────────────────────────────

/** game3 joins this union once the letter-drawing game is built */
export const gameIdSchema = z.enum(['game1', 'game2', 'game4'])

export const submitResultSchema = z.object({
  childId: z.string().uuid(),
  game: gameIdSchema,
  levelId: z.string().min(1),
  correct: z.number().int().min(0),
  incorrect: z.number().int().min(0),
  stars: z.number().int().min(1).max(3),
})

export const gameResultSchema = submitResultSchema.extend({
  id: z.string().uuid(),
  playedAt: z.string().datetime(),
})

// ── Skills ───────────────────────────────────────────────────────────────────

export const skillScoreSchema = z.object({
  score: z.number().min(0).max(100),
  confidence: z.number().min(0).max(1),
})

export const skillProfileSchema = z.object({
  phonologicalAwareness: skillScoreSchema,
  visualDiscrimination: skillScoreSchema,
  sequentialMemory: skillScoreSchema,
  auditoryProcessing: skillScoreSchema,
  processingSpeed: skillScoreSchema,
})

// ── Inferred types ───────────────────────────────────────────────────────────

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type AuthUser = z.infer<typeof userSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
export type CreateChildInput = z.infer<typeof createChildSchema>
export type UpdateChildInput = z.infer<typeof updateChildSchema>
export type ChildDto = z.infer<typeof childSchema>
export type GameId = z.infer<typeof gameIdSchema>
export type SubmitResultInput = z.infer<typeof submitResultSchema>
export type GameResultDto = z.infer<typeof gameResultSchema>
export type SkillScoreDto = z.infer<typeof skillScoreSchema>
export type SkillProfileDto = z.infer<typeof skillProfileSchema>
