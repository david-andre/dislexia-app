import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { ActivityPayload } from '@/types'

export function useSubmitActivity() {
  return useMutation({
    mutationFn: (payload: ActivityPayload) =>
      api.post('/api/activities', payload),
  })
}
