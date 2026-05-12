import { useParams } from 'react-router-dom'
import { getStars } from '@/games/game1'
import { useGame2 } from '@/hooks/useGame2'

import FeedbackToast from '@/components/FeedbackToast'
import VictoryModal from '@/components/VictoryModal'
import InstructionsModal from '@/components/InstructionsModal'

import Game2Header from './Game2Header'
import SyllableSourceArea from './SyllableSourceArea'
import SyllableTargetArea from './SyllableTargetArea'
import Game2AudioButton from './Game2AudioButton'

import '../game1.css'
import '../game2.css'

export default function Game2() {
  const { levelId } = useParams<{ levelId: string }>()
  const {
    level,
    questions,
    score,
    inProgress,
    completedWord,
    canUndo,
    feedback,
    showInstructions,
    victory,
    a11yAnnouncement,
    onDragStart,
    onDragOver,
    onDrop,
    addSyllableToTarget,
    undoLastSyllable,
    playAudio,
    handleShowInstructions,
    handleCloseInstructions,
    handleVictoryClose,
    setFeedback,
  } = useGame2(levelId)

  if (!level) return null

  return (
    <div className="g1 g2 h-full overflow-auto pb-8">
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        Palabra {score.correct + 1} de {questions.length}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {a11yAnnouncement}
      </div>
      <Game2Header
        score={score.correct}
        totalQuestions={questions.length}
        backTo="/game2"
        onShowInstructions={handleShowInstructions}
      />
      <div className="g2-drag-container">
        <div className="g2-drag-grid">
          {/* key re-mounts on each wrong answer so the shake animation retriggers */}
          <div key={score.incorrect} className={feedback?.type === 'error' ? 'g2-shake' : ''}>
            <SyllableSourceArea
              syllables={inProgress}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onAddToTarget={addSyllableToTarget}
            />
          </div>
          <SyllableTargetArea
            completedSyllables={completedWord.map((taskName) => ({ taskName }))}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onUndoLast={undoLastSyllable}
            canUndo={canUndo}
          />
        </div>
        <div className="g2-controls">
          <Game2AudioButton onClick={playAudio} />
          {/* key re-mounts on each correct answer so the flash animation retriggers */}
          <p
            key={`preview-${score.correct}`}
            className={`g2-word-preview${feedback?.type === 'success' ? ' g2-flash-correct' : ''}`}
            aria-live="polite"
            aria-label={
              completedWord.length
                ? `Palabra formada: ${completedWord.join(',')}`
                : 'Sin sílabas'
            }
          >
            {completedWord.join(',')}
          </p>
        </div>
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
          description="Escucha la palabra y ordena las sílabas arrastrándolas al recuadro «Aquí». También puedes hacer clic en una sílaba o enfocarla con el teclado y pulsar Entrar o Espacio para colocarla en orden. Usa «Quitar última» si te equivocas."
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
