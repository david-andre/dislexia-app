interface WordDisplayProps {
  syllables: string[]
  /** Syllables that are options (shown with dashed border) */
  optionTexts: string[]
}

export default function WordDisplay({ syllables, optionTexts }: WordDisplayProps) {
  const optionSet = new Set(optionTexts)

  return (
    <div className="inline-flex flex-wrap justify-center gap-2 mt-8" role="group" aria-label="Palabra formada">
      {syllables.map((syllable, index) => {
        if (syllable === '') {
          return (
            <span
              key={index}
              className="syllable-box syllable-box-blank font-luckiest-guy"
              aria-label="Espacio para completar"
            />
          )
        }
        if (optionSet.has(syllable)) {
          return (
            <span
              key={index}
              className="syllable-box syllable-box-option font-luckiest-guy"
            >
              {syllable}
            </span>
          )
        }
        return (
          <span
            key={index}
            className="syllable-box syllable-box-fixed font-luckiest-guy"
          >
            {syllable}
          </span>
        )
      })}
    </div>
  )
}
