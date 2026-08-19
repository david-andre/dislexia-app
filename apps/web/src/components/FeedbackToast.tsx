import { useEffect } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

interface FeedbackToastProps {
  type: 'success' | 'error'
  message: string
  onClose: () => void
  duration?: number
}

export default function FeedbackToast({
  type,
  message,
  onClose,
  duration = 1500,
}: FeedbackToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const isSuccess = type === 'success'

  return (
    <div
      role="alert"
      aria-live={isSuccess ? 'polite' : 'assertive'}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg bg-white border-2"
      style={{
        borderColor: isSuccess ? '#22c55e' : '#ef4444',
      }}
    >
      {isSuccess ? (
        <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
      ) : (
        <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
      )}
      <span
        className="font-semibold text-lg"
        style={{ color: isSuccess ? '#166534' : '#b91c1c' }}
      >
        {message}
      </span>
    </div>
  )
}
