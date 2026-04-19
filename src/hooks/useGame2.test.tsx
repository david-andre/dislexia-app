import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useGame2 } from './useGame2'
import { useAuthStore } from '@/stores/authStore'
import { useGame2ProgressStore } from '@/stores/game2ProgressStore'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/hooks/useSubmitActivity', () => ({
  useSubmitActivity: () => ({ mutate: vi.fn() }),
}))

// Audio is not available in jsdom
vi.stubGlobal('Audio', vi.fn(() => ({ play: vi.fn().mockResolvedValue(undefined) })))

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/game2/level/1']}>
      {children}
    </MemoryRouter>
  )
}

// Correct syllable orders per level-1 question
const LEVEL1_ANSWERS = [
  ['CA', 'MI', 'SE', 'TA'],
  ['PE', 'CE', 'RA'],
  ['FLO', 'RE', 'RO'],
  ['CA', 'MIO', 'NE', 'TA'],
  ['TE', 'LÉ', 'FO', 'NO'],
]

function answerCorrectly(result: ReturnType<typeof useGame2>, questionIndex: number) {
  for (const syllable of LEVEL1_ANSWERS[questionIndex]) {
    act(() => { result.addSyllableToTarget(syllable) })
  }
}

describe('useGame2', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({ selectedChild: null })
    useGame2ProgressStore.setState({ byChild: {} })
  })

  it('returns null level for invalid levelId', () => {
    const { result } = renderHook(() => useGame2('invalid'), { wrapper })
    expect(result.current.level).toBeNull()
  })

  it('returns correct level for valid levelId', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    expect(result.current.level?.id).toBe('1')
    expect(result.current.questions).toHaveLength(5)
  })

  it('navigates to /game2 when levelId is invalid', () => {
    renderHook(() => useGame2('invalid'), { wrapper })
    expect(mockNavigate).toHaveBeenCalledWith('/game2', { replace: true })
  })

  it('starts with first question syllables in inProgress pool', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    const names = result.current.inProgress.map((t) => t.taskName)
    expect(names).toEqual(expect.arrayContaining(['CA', 'MI', 'SE', 'TA']))
  })

  it('addSyllableToTarget appends syllable to completedWord', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    act(() => { result.current.addSyllableToTarget('CA') })
    expect(result.current.completedWord).toEqual(['CA'])
    expect(result.current.canUndo).toBe(true)
  })

  it('undoLastSyllable removes the last placed syllable', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    act(() => { result.current.addSyllableToTarget('CA') })
    act(() => { result.current.addSyllableToTarget('MI') })
    act(() => { result.current.undoLastSyllable() })
    expect(result.current.completedWord).toEqual(['CA'])
  })

  it('undoLastSyllable is a no-op when completedWord is empty', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    act(() => { result.current.undoLastSyllable() })
    expect(result.current.completedWord).toEqual([])
  })

  it('correct answer advances score and shows success feedback', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    answerCorrectly(result.current, 0)
    expect(result.current.score.correct).toBe(1)
    expect(result.current.score.incorrect).toBe(0)
    expect(result.current.feedback).toEqual({ type: 'success', message: 'Bien hecho' })
  })

  it('incorrect order increments incorrect count and shows error feedback', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    // Drop in wrong order: MI first instead of CA
    act(() => { result.current.addSyllableToTarget('MI') })
    act(() => { result.current.addSyllableToTarget('CA') })
    act(() => { result.current.addSyllableToTarget('SE') })
    act(() => { result.current.addSyllableToTarget('TA') })
    expect(result.current.score.incorrect).toBe(1)
    expect(result.current.score.correct).toBe(0)
    expect(result.current.feedback?.type).toBe('error')
    // Syllables should be reset to pool
    expect(result.current.completedWord).toEqual([])
  })

  it('sets victory after all 5 correct answers', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    for (let i = 0; i < 5; i++) {
      answerCorrectly(result.current, i)
    }
    expect(result.current.victory).toEqual({ correct: 5, incorrect: 0 })
  })

  it('handleVictoryClose navigates to /game2 and saves progress', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    for (let i = 0; i < 5; i++) {
      answerCorrectly(result.current, i)
    }
    expect(result.current.victory).not.toBeNull()
    act(() => { result.current.handleVictoryClose() })
    expect(mockNavigate).toHaveBeenCalledWith('/game2')
    const store = useGame2ProgressStore.getState()
    expect(store.getLevelResult('default', '1')).toMatchObject({ stars: 3, correct: 5, incorrect: 0 })
  })

  it('handleShowInstructions and handleCloseInstructions toggle modal', () => {
    const { result } = renderHook(() => useGame2('1'), { wrapper })
    expect(result.current.showInstructions).toBe(false)
    act(() => { result.current.handleShowInstructions() })
    expect(result.current.showInstructions).toBe(true)
    act(() => { result.current.handleCloseInstructions() })
    expect(result.current.showInstructions).toBe(false)
  })
})
