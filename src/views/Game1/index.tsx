import { useParams } from 'react-router-dom'
import { useGame1 } from '@/hooks/useGame1'

import FeedbackToast from '@/components/FeedbackToast'
import VictoryModal from '@/components/VictoryModal'
import InstructionsModal from '@/components/InstructionsModal'

import Game1Header from './Game1Header'
import OptionCards from './OptionCards'
import Game1Footer from './Game1Footer'

import '../game1.css'

export default function Game1() {
  const { levelId } = useParams<{ levelId: string }>()
  const {
    level,
    questions,
    score,
    wordOptions,
    currentSyllables,
    currentOptionTexts,
    feedback,
    showInstructions,
    victory,
    handleSelect,
    playAudio,
    handleShowInstructions,
    handleCloseInstructions,
    handleVictoryClose,
    validateAnswer,
    setFeedback,
    getStars,
  } = useGame1(levelId)

  if (!level) return null

  return (
    <div className="g1 h-full overflow-auto">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Pregunta {score.correct + 1} de {questions.length}
      </div>
      <Game1Header
        score={score.correct}
        totalQuestions={questions.length}
        backTo="/game1"
        onShowInstructions={handleShowInstructions}
      />
      <div className="flex-1 mt-3">
        <OptionCards options={wordOptions} onSelect={handleSelect} />
        <Game1Footer
          syllables={currentSyllables}
          optionTexts={currentOptionTexts}
          onValidate={validateAnswer}
          onPlayAudio={playAudio}
        />
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
          description="Escucha la palabra y elige la sílaba que falta para completarla."
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
