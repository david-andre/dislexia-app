import { useState, useCallback } from 'react'
import { Volume2 } from 'lucide-react'

// Resolve audio asset URLs at module load; audio data is only fetched on play (bundle-conditional)
const audioAssets = import.meta.glob('../../assets/audio/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

// Keys whose filename differs from key.toLowerCase()
const FILENAME_OVERRIDES: Record<string, string> = {
  'LÉ': 'le',
  m: 'eme',
  n: 'ene',
  b: 'be',
  d: 'de',
  q: 'qu',
  p: 'pe',
}

function getAudioUrl(key: string): string | undefined {
  const filename =
    FILENAME_OVERRIDES[key] ?? FILENAME_OVERRIDES[key.toLowerCase()] ?? key.toLowerCase()
  return audioAssets[`../../assets/audio/${filename}.mp3`]
}

interface CardProps {
  content: string
  handleClick?: (content: string) => void
  changeBg?: boolean
  Bg?: boolean
  backgroundColor?: string
}

export default function Card({ content, handleClick, changeBg, Bg, backgroundColor }: CardProps) {
  const [bg, setBg] = useState('card bg-red-600')

  const playAudio = useCallback(() => {
    const url = getAudioUrl(content)
    if (!url) return
    new Audio(url).play().catch(() => {})
  }, [content])

  const toggleBg = useCallback(() => {
    setBg((prev) =>
      prev === 'card bg-red-600' ? 'card bg-yellow-600' : 'card bg-red-600'
    )
  }, [])

  const baseContent = (
    <>
      <span>{content} </span>
      <Volume2
        className="inline-block w-6 h-6 align-text-top cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          playAudio()
        }}
      />
    </>
  )

  if (handleClick) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick(content)
      }
    }
    return (
      <div
        className="card bg-red-600"
        role="button"
        tabIndex={0}
        onClick={() => handleClick(content)}
        onKeyDown={handleKeyDown}
        aria-label={`Opción ${content}. Presiona Enter o Espacio para seleccionar.`}
      >
        <div className="card_title title-white">
          <p className="font-luckiest-guy">{baseContent}</p>
        </div>
      </div>
    )
  }

  if (changeBg) {
    const displayBg =
      backgroundColor !== undefined
        ? `card ${backgroundColor ? 'bg-yellow-600' : 'bg-red-600'}`
        : bg
    const isControlled = backgroundColor !== undefined
    return (
      <div
        className={displayBg}
        onClick={isControlled ? undefined : toggleBg}
        onKeyDown={
          isControlled ? undefined : (e) => e.key === 'Enter' && toggleBg()
        }
        role={isControlled ? undefined : 'button'}
        tabIndex={isControlled ? undefined : 0}
      >
        <div className="card_title title-white">
          <p className="text-7xl">{baseContent}</p>
        </div>
      </div>
    )
  }

  if (Bg) {
    return (
      <div className="card bg-yellow-600">
        <div className="card_title title-white">
          <p className="text-7xl">{baseContent}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-red-600">
      <div className="card_title title-white">
        <p className="font-luckiest-guy text-7xl">{baseContent}</p>
      </div>
    </div>
  )
}
