import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Child } from '@/types'

export function useChildren(enabled = true) {
  return useQuery({
    queryKey: ['children'],
    queryFn: () => api.get<Child[]>('/api/user/children'),
    enabled,
  })
}
