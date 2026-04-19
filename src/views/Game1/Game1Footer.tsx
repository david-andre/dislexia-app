import { Volume2 } from 'lucide-react'
import ActionButton from '@/components/ActionButton'
import WordDisplay from './WordDisplay'

interface Game1FooterProps {
  syllables: string[]
  optionTexts: string[]
  onValidate: () => void
  onPlayAudio: () => void
}

export default function Game1Footer({
  syllables,
  optionTexts,
  onValidate,
  onPlayAudio,
}: Game1FooterProps) {
  return (
    <div className="text-center mt-6 pb-8">
      <div className="flex flex-col items-center gap-6">
        <ActionButton
          icon="check"
          color="bg-amber-500 hover:bg-amber-600"
          fontSize="g1-validate-btn text-2xl"
          ariaLabel="Validar respuesta"
          handleAnswer={onValidate}
        />
        <WordDisplay syllables={syllables} optionTexts={optionTexts} />
        <button
          type="button"
          className="g1-audio-btn inline-flex items-center gap-2 font-luckiest-guy text-gray-900 bg-white/95 hover:bg-white transition-colors shadow-md rounded-xl cursor-pointer"
          onClick={onPlayAudio}
          aria-label="Reproducir audio"
        >
          <Volume2 className="w-7 h-7" aria-hidden />
          <span>Escuchar</span>
        </button>
      </div>
    </div>
  )
}
