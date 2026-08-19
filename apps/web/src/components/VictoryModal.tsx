import { useEffect, useRef } from 'react'
import { Trophy } from 'lucide-react'

interface VictoryModalProps {
  correctCount: number
  incorrectCount: number
  /** 1, 2, or 3 stars based on performance */
  stars: number
  onClose: () => void
  autoCloseMs?: number
}

export default function VictoryModal({
  correctCount,
  incorrectCount,
  stars,
  onClose,
  autoCloseMs = 4000,
}: VictoryModalProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null
    buttonRef.current?.focus()
  }, [])

  useEffect(() => {
    const timer = setTimeout(onClose, autoCloseMs)
    return () => clearTimeout(timer)
  }, [onClose, autoCloseMs])

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
      aria-labelledby="victory-title"
      aria-describedby="victory-desc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" aria-hidden />
        <h2 id="victory-title" className="text-3xl font-bold text-gray-900 mb-4">
          ¡GANASTE!
        </h2>
        <div id="victory-desc" className="text-gray-600 mb-6 space-y-2">
          <p>
            Correctos: <strong>{correctCount}</strong> puntos
          </p>
          <p>
            Incorrectos: <strong>{incorrectCount}</strong> puntos
          </p>
          <p className="sr-only">
            {stars} de 3 estrellas
          </p>
        </div>
        <div className="flex justify-center gap-2 mb-6" aria-hidden>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="text-5xl"
              style={{ color: i <= stars ? '#f59e0b' : '#e5e7eb' }}
            >
              ★
            </span>
          ))}
        </div>
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClose}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
