import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useGame4ProgressStore } from '@/stores/game4ProgressStore'
import { useSubmitActivity } from '@/hooks/useSubmitActivity'
import {
  GAME4_LEVELS,
  ACTIVITY_NAME,
  getValidIndices,
  getStars,
} from '@/games/game4'
import type { Game4Level, Game4Question } from '@/games/game4'

export interface UseGame4Result {
  level: Game4Level | null
  question: Game4Question | null
  totalQuestions: number
  currentQuestionIndex: number
  validIndices: number[]
  selectedIndices: number[]
  score: { correct: number; incorrect: number }
  feedback: { type: 'success' | 'error'; message: string } | null
  victory: { correct: number; incorrect: number } | null
  showInstructions: boolean
  a11yAnnouncement: string
  toggleCard: (index: number) => void
  verifyAnswer: () => void
  handleVictoryClose: () => void
  handleShowInstructions: () => void
  handleCloseInstructions: () => void
  setFeedback: (fb: UseGame4Result['feedback']) => void
}

export function useGame4(levelId: string | undefined): UseGame4Result {
  const navigate = useNavigate()
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const setLevelResult = useGame4ProgressStore((s) => s.setLevelResult)
  const submitActivity = useSubmitActivity()

  const level = levelId ? GAME4_LEVELS.find((l) => l.id === levelId) ?? null : null

  useEffect(() => {
    if (!levelId || !level) navigate('/game4', { replace: true })
  }, [levelId, level, navigate])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [feedback, setFeedback] = useState<UseGame4Result['feedback']>(null)
  const [victory, setVictory] = useState<{ correct: number; incorrect: number } | null>(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const [a11yAnnouncement, setA11yAnnouncement] = useState('')

  useEffect(() => {
    setCurrentQuestionIndex(0)
    setSelectedIndices([])
    setScore({ correct: 0, incorrect: 0 })
    setFeedback(null)
    setVictory(null)
    setA11yAnnouncement('')
  }, [levelId])

  const question = level?.questions[currentQuestionIndex] ?? null
  const totalQuestions = level?.questions.length ?? 0
  const validIndices = question
    ? getValidIndices(question.cards, question.targetLetter)
    : []

  const toggleCard = useCallback((index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }, [])

  const verifyAnswer = useCallback(() => {
    if (!question) return
    const allValid = validIndices.every((i) => selectedIndices.includes(i))
    const noInvalid = selectedIndices.every((i) => validIndices.includes(i))

    if (allValid && noInvalid) {
      const newCorrect = score.correct + 1
      const newScore = { correct: newCorrect, incorrect: score.incorrect }
      if (newCorrect >= totalQuestions) {
        setVictory(newScore)
        setA11yAnnouncement(`Juego completado. ${newCorrect} correctas, ${score.incorrect} incorrectas.`)
      } else {
        setScore(newScore)
        setCurrentQuestionIndex((i) => i + 1)
        setSelectedIndices([])
        setFeedback({ type: 'success', message: 'Bien hecho' })
        setA11yAnnouncement('Bien hecho. Respuesta correcta.')
      }
    } else {
      setScore((s) => ({ ...s, incorrect: s.incorrect + 1 }))
      setFeedback({ type: 'error', message: 'Inténtalo de nuevo' })
      setA11yAnnouncement('Inténtalo de nuevo. Selección incorrecta.')
    }
  }, [question, validIndices, selectedIndices, score, totalQuestions])

  const handleVictoryClose = useCallback(() => {
    if (!victory || !level) return
    const stars = getStars(victory.incorrect)
    setLevelResult(selectedChild?.id ?? 'default', level.id, {
      stars,
      correct: victory.correct,
      incorrect: victory.incorrect,
    })
    submitActivity.mutate({
      nombre: ACTIVITY_NAME,
      correctas: victory.correct,
      incorrectas: victory.incorrect,
      usuario: selectedChild?.id ?? '',
    })
    setVictory(null)
    navigate('/game4')
  }, [victory, level, selectedChild, setLevelResult, submitActivity, navigate])

  const handleShowInstructions = useCallback(() => setShowInstructions(true), [])
  const handleCloseInstructions = useCallback(() => setShowInstructions(false), [])

  return {
    level,
    question,
    totalQuestions,
    currentQuestionIndex,
    validIndices,
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
  }
}
