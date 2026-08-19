import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface GameLevelResult {
  stars: number
  correct: number
  incorrect: number
}

export interface GameProgressState {
  byChild: Record<string, Record<string, GameLevelResult>>
  setLevelResult: (
    childId: string,
    levelId: string,
    result: GameLevelResult
  ) => void
  getLevelResult: (childId: string, levelId: string) => GameLevelResult | null
}

/**
 * All games share the same progress shape and best-result-only rule;
 * only the localStorage key differs per game.
 */
export function createGameProgressStore(storageName: string) {
  return create<GameProgressState>()(
    persist(
      (set, get) => ({
        byChild: {},
        setLevelResult: (childId, levelId, result) => {
          set((state) => {
            const current = state.byChild[childId]?.[levelId]
            const best =
              !current || result.stars >= current.stars ? result : current
            return {
              byChild: {
                ...state.byChild,
                [childId]: {
                  ...(state.byChild[childId] ?? {}),
                  [levelId]: best,
                },
              },
            }
          })
        },
        getLevelResult: (childId, levelId) => {
          return get().byChild[childId]?.[levelId] ?? null
        },
      }),
      {
        name: storageName,
        partialize: (state) => ({ byChild: state.byChild }),
      }
    )
  )
}
