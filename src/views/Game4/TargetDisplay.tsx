interface TargetDisplayProps {
  letter: string
}

export default function TargetDisplay({ letter }: TargetDisplayProps) {
  return (
    <div className="g4-target">
      <span className="g4-target-label font-luckiest-guy">
        Encuentra todas las:
      </span>
      <div
        className="g4-target-card"
        aria-label={`Letra objetivo: ${letter}`}
        role="img"
      >
        {letter}
      </div>
    </div>
  )
}
