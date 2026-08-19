import { Volume2 } from 'lucide-react'

interface Game2AudioButtonProps {
  onClick: () => void
}

export default function Game2AudioButton({ onClick }: Game2AudioButtonProps) {
  return (
    <button
      type="button"
      className="g2-audio-btn inline-flex items-center gap-2 cursor-pointer text-gray-900 bg-white/95 hover:bg-white transition-colors font-luckiest-guy"
      onClick={onClick}
      aria-label="Escuchar la palabra a formar"
    >
      <Volume2 className="w-10 h-10" aria-hidden />
      <span>Escuchar</span>
    </button>
  )
}
