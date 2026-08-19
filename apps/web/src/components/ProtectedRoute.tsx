import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  /** Redirect to /children unless a child profile is selected */
  requireChild?: boolean
}

export function ProtectedRoute({ children, requireChild }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user)
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (requireChild && !selectedChild) {
    return <Navigate to="/children" replace />
  }

  return <>{children}</>
}
