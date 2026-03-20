import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { ReportItem } from '@/types'

export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: () => api.get<ReportItem[]>('/api/reports'),
  })
}
