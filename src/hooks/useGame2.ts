import { useReducer, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useGame2ProgressStore } from '@/stores/game2ProgressStore'
import { useSubmitActivity } from '@/hooks/useSubmitActivity'
import { getStars } from '@/games/game1'
import {
  GAME2_LEVELS,
  ACTIVITY_NAME,
  WINNING_THRESHOLD,
  checkOrder,
} from '@/games/game2'
import type { Game2Question, Game2Level } from '@/games/game2'

interface Task {
  taskName: string
  type: string
}

interface Game2State {
  tasks: Task[]
  options: Task[][]
  pendingAnswers: string[]
  completedWord: string[]
  score: { correct: number; incorrect: number }
}

type Game2Action =
  | { type: 'DROP'; taskName: string; cat: string }
  | { type: 'UNDO_LAST' }

function toTasks(syllables: string[]): Task[] {
  return syllables.map((s) => ({ taskName: s, type: 'inProgress' }))
}

function buildOptions(questions: { syllables: string[] }[]): Task[][] {
  return questions.slice(1).map((q) => toTasks(q.syllables))
}

function initialGameState(questions: Game2Question[]): Game2State {
  if (questions.length === 0) {
    return { tasks: [], options: [], pendingAnswers: [], completedWord: [], score: { correct: 0, incorrect: 0 } }
  }
  return {
    tasks: toTasks(questions[0].syllables),
    options: buildOptions(questions).map((o) => o.map((t) => ({ ...t }))),
    pendingAnswers: questions.map((q) => q.correctOrder.join(',')),
    completedWord: [],
    score: { correct: 0, incorrect: 0 },
  }
}

function gameReducer(state: Game2State, action: Game2Action): Game2State {
  if (action.type === 'UNDO_LAST') {
    if (state.completedWord.length === 0) return state
    const removed = state.completedWord[state.completedWord.length - 1]
    return {
      ...state,
      completedWord: state.completedWord.slice(0, -1),
      tasks: state.tasks.map((t) =>
        t.taskName === removed ? { ...t, type: 'inProgress' } : t
      ),
    }
  }

  if (action.type !== 'DROP') return state

  const { taskName, cat } = action
  const nextCompletedWord =
    cat === 'Done' ? [...state.completedWord, taskName] : state.completedWord

  const nextTasks = state.tasks.map((t) =>
    t.taskName === taskName ? { ...t, type: cat } : t
  )

  const allDone = nextTasks.every((t) => t.type !== 'inProgress')
  if (!allDone) {
    return { ...state, tasks: nextTasks, completedWord: nextCompletedWord }
  }

  if (!checkOrder(nextCompletedWord, state.pendingAnswers[0])) {
    return {
      ...state,
      tasks: state.tasks.map((x) => ({ ...x, type: 'inProgress' })),
      completedWord: [],
      score: { ...state.score, incorrect: state.score.incorrect + 1 },
    }
  }

  const nextRoundTasks = state.options[0] ?? []
  return {
    tasks: nextRoundTasks,
    options: state.options.slice(1),
    pendingAnswers: state.pendingAnswers.slice(1),
    completedWord: [],
    score: { ...state.score, correct: state.score.correct + 1 },
  }
}

export interface UseGame2Result {
  level: Game2Level | null
  questions: Game2Question[]
  score: { correct: number; incorrect: number }
  inProgress: { taskName: string; type: string }[]
  completedWord: string[]
  canUndo: boolean
  feedback: { type: 'success' | 'error'; message: string } | null
  showInstructions: boolean
  victory: { correct: number; incorrect: number } | null
  a11yAnnouncement: string
  onDragStart: (e: React.DragEvent, taskName: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, cat: string) => void
  addSyllableToTarget: (taskName: string) => void
  undoLastSyllable: () => void
  playAudio: () => void
  handleShowInstructions: () => void
  handleCloseInstructions: () => void
  handleVictoryClose: () => void
  setFeedback: (fb: UseGame2Result['feedback']) => void
}

export function useGame2(levelId: string | undefined): UseGame2Result {
  const navigate = useNavigate()
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const setLevelResult = useGame2ProgressStore((s) => s.setLevelResult)
  const submitActivity = useSubmitActivity()

  const level = levelId ? GAME2_LEVELS.find((l) => l.id === levelId) ?? null : null
  const questions = level?.questions ?? []

  useEffect(() => {
    if (!levelId || !level) navigate('/game2', { replace: true })
  }, [levelId, level, navigate])

  const [game, dispatch] = useReducer(gameReducer, questions, initialGameState)
  const [feedback, setFeedback] = useState<UseGame2Result['feedback']>(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const [victory, setVictory] = useState<{ correct: number; incorrect: number } | null>(null)
  const [a11yAnnouncement, setA11yAnnouncement] = useState('')

  const scoreRef = useRef(game.score)
  useEffect(() => {
    const prev = scoreRef.current
    const { correct, incorrect } = game.score
    if (correct > prev.correct) {
      if (correct >= WINNING_THRESHOLD) {
        setVictory({ correct, incorrect })
        setA11yAnnouncement(`Juego completado. ${correct} correctas, ${incorrect} incorrectas.`)
      } else {
        setFeedback({ type: 'success', message: 'Bien hecho' })
        setA11yAnnouncement('Bien hecho. Palabra correcta.')
      }
    } else if (incorrect > prev.incorrect) {
      setFeedback({ type: 'error', message: 'Inténtalo de nuevo' })
      setA11yAnnouncement('Inténtalo de nuevo. Orden incorrecto.')
    }
    scoreRef.current = game.score
  }, [game.score.correct, game.score.incorrect])

  const onDragStart = useCallback((e: React.DragEvent, taskName: string) => {
    e.dataTransfer.setData('taskName', taskName)
  }, [])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const onDrop = useCallback((e: React.DragEvent, cat: string) => {
    const taskName = e.dataTransfer.getData('taskName')
    if (!taskName) return
    dispatch({ type: 'DROP', taskName, cat })
  }, [])

  const addSyllableToTarget = useCallback((taskName: string) => {
    dispatch({ type: 'DROP', taskName, cat: 'Done' })
  }, [])

  const undoLastSyllable = useCallback(() => {
    dispatch({ type: 'UNDO_LAST' })
  }, [])

  const playAudio = useCallback(() => {
    const idx = Math.min(
      questions.length - 1,
      Math.max(0, questions.length - game.pendingAnswers.length)
    )
    const src = questions[idx]?.audioUrl
    if (src) new Audio(src).play().catch(() => {})
  }, [game.pendingAnswers.length, questions])

  const handleShowInstructions = useCallback(() => setShowInstructions(true), [])
  const handleCloseInstructions = useCallback(() => setShowInstructions(false), [])

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
    navigate('/game2')
  }, [victory, level, selectedChild, setLevelResult, submitActivity, navigate])

  return {
    level,
    questions,
    score: game.score,
    inProgress: game.tasks.filter((t) => t.type === 'inProgress'),
    completedWord: game.completedWord,
    canUndo: game.completedWord.length > 0,
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
  }
}
