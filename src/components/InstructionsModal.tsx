import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface InstructionsModalProps {
  title: string
  description: string
  onClose: () => void
}

export default function InstructionsModal({
  title,
  description,
  onClose,
}: InstructionsModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const selector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusables = [...panel.querySelectorAll<HTMLElement>(selector)]
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClose = () => {
    previousFocusRef.current?.focus()
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      handleClose()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-title"
      aria-describedby="instructions-desc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={panelRef}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6 text-gray-500" aria-hidden />
        </button>
        <h2 id="instructions-title" className="text-xl font-bold text-gray-900 mb-3 pr-8">
          {title}
        </h2>
        <p id="instructions-desc" className="text-gray-600">
          {description}
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="mt-6 w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}
