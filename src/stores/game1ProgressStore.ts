import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Game1LevelResult {
  stars: number
  correct: number
  incorrect: number
}

interface Game1ProgressState {
  byChild: Record<string, Record<string, Game1LevelResult>>
  setLevelResult: (
    childId: string,
    levelId: string,
    result: Game1LevelResult
  ) => void
  getLevelResult: (childId: string, levelId: string) => Game1LevelResult | null
}

export const useGame1ProgressStore = create<Game1ProgressState>()(
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
      name: 'dislexia-game1-progress',
      partialize: (state) => ({ byChild: state.byChild }),
    }
  )
)
