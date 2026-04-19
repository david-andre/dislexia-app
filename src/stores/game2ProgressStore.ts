import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Game2LevelResult {
  stars: number
  correct: number
  incorrect: number
}

interface Game2ProgressState {
  byChild: Record<string, Record<string, Game2LevelResult>>
  setLevelResult: (
    childId: string,
    levelId: string,
    result: Game2LevelResult
  ) => void
  getLevelResult: (childId: string, levelId: string) => Game2LevelResult | null
}

export const useGame2ProgressStore = create<Game2ProgressState>()(
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
      name: 'dislexia-game2-progress',
      partialize: (state) => ({ byChild: state.byChild }),
    }
  )
)
