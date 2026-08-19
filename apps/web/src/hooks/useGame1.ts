import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useGame1ProgressStore } from '@/stores/game1ProgressStore'
import { GAME1_LEVELS, WINNING_THRESHOLD, getStars } from '@dislexia/shared/game1'
import { getAudioUrl } from '@/audio'
import type { Game1Level } from '@dislexia/shared/game1'

/** Map level options to the shape CardsList expects (val = isCorrect) */
function toCardsListOptions(
  options: { text: string; isCorrect?: boolean }[]
): { text: string; val?: boolean }[] {
  return options.map((o) => ({ text: o.text, val: o.isCorrect }))
}

function getOptionTexts(options: { text: string }[]): string[] {
  return options.map((o) => o.text)
}

export interface UseGame1Result {
  level: Game1Level | null
  questions: Game1Level['questions']
  score: { correct: number; incorrect: number }
  gameWords: string[][]
  wordOptions: { text: string; val?: boolean }[][]
  currentSyllables: string[]
  currentOptionTexts: string[]
  feedback: { type: 'success' | 'error'; message: string } | null
  showInstructions: boolean
  victory: { correct: number; incorrect: number } | null
  handleSelect: (content: string) => void
  playAudio: () => void
  handleShowInstructions: () => void
  handleCloseInstructions: () => void
  handleVictoryClose: () => void
  validateAnswer: () => void
  setFeedback: (feedback: UseGame1Result['feedback']) => void
  getStars: (incorrect: number) => number
}

export function useGame1(levelId: string | undefined): UseGame1Result {
  const navigate = useNavigate()
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const setLevelResult = useGame1ProgressStore((s) => s.setLevelResult)

  const level = levelId ? GAME1_LEVELS.find((l) => l.id === levelId) ?? null : null
  const questions = level?.questions ?? []

  useEffect(() => {
    if (!levelId || !level) {
      navigate('/game1', { replace: true })
    }
  }, [levelId, level, navigate])

  const [gameWords, setGameWords] = useState<string[][]>(() => [])
  const [wordOptions, setWordOptions] = useState<{ text: string; val?: boolean }[][]>(() => [])

  useEffect(() => {
    if (!level) return
    setGameWords(level.questions.map((q) => [...q.syllables]))
    setWordOptions(level.questions.map((q) => toCardsListOptions(q.options)))
    setScore({ correct: 0, incorrect: 0 })
    setFeedback(null)
    setShowInstructions(false)
    setVictory(null)
  }, [level?.id])

  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [feedback, setFeedback] = useState<
    { type: 'success' | 'error'; message: string } | null
  >(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const [victory, setVictory] = useState<{
    correct: number
    incorrect: number
  } | null>(null)

  const currentAudioUrl = getAudioUrl(questions[score.correct]?.audioKey)
  const currentSyllables = gameWords[0] ?? []
  const currentOptionTexts = getOptionTexts(
    questions[score.correct]?.options ?? []
  )

  const handleSelect = useCallback((content: string) => {
    setGameWords((prev) => {
      const next = prev.map((row) => [...row])
      if (next[0]) next[0][1] = content
      return next
    })
  }, [])

  const playAudio = useCallback(() => {
    if (currentAudioUrl) new Audio(currentAudioUrl).play().catch(() => {})
  }, [currentAudioUrl])

  const handleShowInstructions = useCallback(() => {
    setShowInstructions(true)
  }, [])

  const handleCloseInstructions = useCallback(() => {
    setShowInstructions(false)
  }, [])

  const handleVictoryClose = useCallback(() => {
    if (!victory || !levelId) return
    if (selectedChild) {
      setLevelResult(selectedChild.id, levelId, {
        stars: getStars(victory.incorrect),
        correct: victory.correct,
        incorrect: victory.incorrect,
      })
    }
    setVictory(null)
    navigate('/game1')
  }, [victory, levelId, selectedChild, setLevelResult, navigate])

  const validateAnswer = useCallback(() => {
    const correct = wordOptions[0]?.find((o) => o.val === true)
    const currentBlank = gameWords[0]?.[1]
    const isCorrect = currentBlank === correct?.text

    if (isCorrect) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }))
      setGameWords((prev) => prev.slice(1))
      setWordOptions((prev) => prev.slice(1))
      setFeedback({ type: 'success', message: 'Correcto' })
    } else {
      setScore((s) => ({ ...s, incorrect: s.incorrect + 1 }))
      setFeedback({ type: 'error', message: 'Inténtalo de nuevo' })
    }

    const newCorrect = isCorrect ? score.correct + 1 : score.correct
    if (newCorrect >= WINNING_THRESHOLD) {
      setVictory({
        correct: newCorrect,
        incorrect: score.incorrect,
      })
    }
  }, [gameWords, wordOptions, score])

  return {
    level,
    questions,
    score,
    gameWords,
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
  }
}
