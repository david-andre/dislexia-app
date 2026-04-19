import Card from '@/components/CardsList/Card'

interface LetterGridProps {
  cards: string[]
  selectedIndices: number[]
  onToggle: (index: number) => void
}

export default function LetterGrid({ cards, selectedIndices, onToggle }: LetterGridProps) {
  return (
    <div
      className="g4-grid"
      role="group"
      aria-label="Tarjetas de letras — selecciona las que coincidan con la letra objetivo"
    >
      {cards.map((letter, i) => {
        const selected = selectedIndices.includes(i)
        return (
          <div
            key={i}
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            aria-label={`Letra ${letter}${selected ? ', seleccionada' : ''}`}
            className={`g4-card-wrapper card2${selected ? ' g4-card-selected' : ''}`}
            onClick={() => onToggle(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onToggle(i)
              }
            }}
          >
            <Card
              content={letter}
              changeBg
              backgroundColor={selected ? '#FCD34D' : ''}
            />
          </div>
        )
      })}
    </div>
  )
}
