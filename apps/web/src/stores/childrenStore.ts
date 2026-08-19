import { create } from 'zustand'
import type { Child } from '@/types'

const STORAGE_KEY = 'dislexia-children:v1'

interface ChildrenState {
  byUser: Record<string, Child[]>
  addChild: (userId: string, child: Omit<Child, 'id'>) => void
  updateChild: (userId: string, child: Child) => void
  deleteChild: (userId: string, childId: string) => void
}

function loadStored(): Record<string, Child[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, Child[]>
  } catch {
    return {}
  }
}

function persist(byUser: Record<string, Child[]>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(byUser))
  } catch {
    // ignore
  }
}

export const useChildrenStore = create<ChildrenState>((set) => ({
  byUser: loadStored(),

  addChild: (userId, child) => {
    const newChild: Child = {
      ...child,
      id: `child-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    }
    set((s) => {
      const next = {
        ...s.byUser,
        [userId]: [...(s.byUser[userId] ?? []), newChild],
      }
      persist(next)
      return { byUser: next }
    })
  },

  updateChild: (userId, child) => {
    set((s) => {
      const next = {
        ...s.byUser,
        [userId]: (s.byUser[userId] ?? []).map((c) => (c.id === child.id ? child : c)),
      }
      persist(next)
      return { byUser: next }
    })
  },

  deleteChild: (userId, childId) => {
    set((s) => {
      const next = {
        ...s.byUser,
        [userId]: (s.byUser[userId] ?? []).filter((c) => c.id !== childId),
      }
      persist(next)
      return { byUser: next }
    })
  },
}))
