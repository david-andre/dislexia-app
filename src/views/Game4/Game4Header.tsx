import LinkButton from '@/components/LinkButton'
import ActionButton from '@/components/ActionButton'

interface Game4HeaderProps {
  score: number
  totalQuestions: number
  backTo?: string
  onShowInstructions: () => void
}

export default function Game4Header({
  score,
  totalQuestions,
  backTo = '/game4',
  onShowInstructions,
}: Game4HeaderProps) {
  return (
    <header className="pt-4 pb-2 px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <LinkButton
            to={backTo}
            icon="home"
            color="bg-amber-500 hover:bg-amber-600"
            fontSize="text-2xl p-3 min-w-[3rem] min-h-[3rem]"
            ariaLabel="Volver a niveles"
          />
          <ActionButton
            icon="book"
            color="bg-blue-500 hover:bg-blue-600"
            fontSize="text-2xl p-3 min-w-[3rem] min-h-[3rem]"
            ariaLabel="Ver instrucciones"
            handleAnswer={onShowInstructions}
          />
        </div>
        <div className="g1-score-badge font-luckiest-guy">
          ★ {score}
        </div>
      </div>
      {totalQuestions > 0 && (
        <div
          className="flex justify-center gap-2 mt-3"
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={totalQuestions}
        >
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`g1-progress-dot ${
                i < score
                  ? 'g1-progress-dot-done'
                  : i === score
                  ? 'g1-progress-dot-current'
                  : ''
              }`}
            />
          ))}
        </div>
      )}
    </header>
  )
}
