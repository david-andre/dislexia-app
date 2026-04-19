import { useParams } from 'react-router-dom'
import { getStars } from '@/games/game4'
import { useGame4 } from '@/hooks/useGame4'

import FeedbackToast from '@/components/FeedbackToast'
import VictoryModal from '@/components/VictoryModal'
import InstructionsModal from '@/components/InstructionsModal'

import Game4Header from './Game4Header'
import TargetDisplay from './TargetDisplay'
import LetterGrid from './LetterGrid'

import '../game1.css'
import '../game4.css'

export default function Game4() {
  const { levelId } = useParams<{ levelId: string }>()
  const {
    level,
    question,
    totalQuestions,
    selectedIndices,
    score,
    feedback,
    victory,
    showInstructions,
    a11yAnnouncement,
    toggleCard,
    verifyAnswer,
    handleVictoryClose,
    handleShowInstructions,
    handleCloseInstructions,
    setFeedback,
  } = useGame4(levelId)

  if (!level || !question) return null

  return (
    <div className="g1 g4 min-h-screen pb-8">
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {a11yAnnouncement}
      </div>

      <Game4Header
        score={score.correct}
        totalQuestions={totalQuestions}
        backTo="/game4"
        onShowInstructions={handleShowInstructions}
      />

      <div className="g4-container">
        <TargetDisplay letter={question.targetLetter} />

        {/* key re-mounts on each wrong answer to retrigger shake */}
        <div key={score.incorrect} className={feedback?.type === 'error' ? 'g4-shake w-full' : 'w-full'}>
          <LetterGrid
            cards={question.cards}
            selectedIndices={selectedIndices}
            onToggle={toggleCard}
          />
        </div>

        <button
          type="button"
          className="g4-verify-btn"
          onClick={verifyAnswer}
          disabled={selectedIndices.length === 0}
          aria-label="Verificar selección"
        >
          Verificar
        </button>
      </div>

      {feedback && (
        <FeedbackToast
          type={feedback.type}
          message={feedback.message}
          onClose={() => setFeedback(null)}
        />
      )}

      {showInstructions && (
        <InstructionsModal
          title="Instrucciones"
          description="Observa la letra modelo en el recuadro amarillo. Luego toca todas las tarjetas que tengan esa misma letra. ¡Cuidado con las letras parecidas! Cuando hayas seleccionado todas, pulsa «Verificar»."
          onClose={handleCloseInstructions}
        />
      )}

      {victory && (
        <VictoryModal
          correctCount={victory.correct}
          incorrectCount={victory.incorrect}
          stars={getStars(victory.incorrect)}
          onClose={handleVictoryClose}
        />
      )}
    </div>
  )
}
