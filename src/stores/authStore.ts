import { create } from 'zustand'
import type { User, Child } from '@/types'

const STORAGE_KEY = 'dislexia-auth:v1'

interface AuthState {
  user: User | null
  selectedChild: Child | null
  setUser: (user: User | null) => void
  setSelectedChild: (child: Child | null) => void
  logout: () => void
}

function loadStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as User
    return data?.id ? data : null
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadStoredUser(),
  selectedChild: null,
  setUser: (user) => {
    set({ user })
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // ignore
    }
  },
  setSelectedChild: (selectedChild) => set({ selectedChild }),
  logout: () => {
    set({ user: null, selectedChild: null })
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  },
}))
