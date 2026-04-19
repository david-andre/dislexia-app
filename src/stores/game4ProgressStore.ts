import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Game4LevelResult {
  stars: number
  correct: number
  incorrect: number
}

interface Game4ProgressState {
  byChild: Record<string, Record<string, Game4LevelResult>>
  setLevelResult: (
    childId: string,
    levelId: string,
    result: Game4LevelResult
  ) => void
  getLevelResult: (childId: string, levelId: string) => Game4LevelResult | null
}

export const useGame4ProgressStore = create<Game4ProgressState>()(
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
      name: 'dislexia-game4-progress',
      partialize: (state) => ({ byChild: state.byChild }),
    }
  )
)
