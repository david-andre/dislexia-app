import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useGame4 } from './useGame4'
import { useAuthStore } from '@/stores/authStore'
import { useGame4ProgressStore } from '@/stores/game4ProgressStore'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('@/hooks/useSubmitActivity', () => ({
  useSubmitActivity: () => ({ mutate: vi.fn() }),
}))

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/game4/level/1']}>
      {children}
    </MemoryRouter>
  )
}

// Level 1: p vs q, cards=['p','p','q','p','q','p'], validIndices=[0,1,3,5]
const VALID = [0, 1, 3, 5]
const INVALID = [2, 4]

describe('useGame4', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({ selectedChild: null })
    useGame4ProgressStore.setState({ byChild: {} })
  })

  it('returns null level for invalid levelId', () => {
    const { result } = renderHook(() => useGame4('invalid'), { wrapper })
    expect(result.current.level).toBeNull()
  })

  it('navigates to /game4 when levelId is invalid', () => {
    renderHook(() => useGame4('invalid'), { wrapper })
    expect(mockNavigate).toHaveBeenCalledWith('/game4', { replace: true })
  })

  it('returns correct level and question for valid levelId', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    expect(result.current.level?.id).toBe('1')
    expect(result.current.question?.targetLetter).toBe('p')
    expect(result.current.validIndices).toEqual(VALID)
  })

  it('toggleCard adds index to selectedIndices', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    act(() => { result.current.toggleCard(0) })
    expect(result.current.selectedIndices).toContain(0)
  })

  it('toggleCard deselects an already-selected index', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    act(() => { result.current.toggleCard(0) })
    act(() => { result.current.toggleCard(0) })
    expect(result.current.selectedIndices).not.toContain(0)
  })

  it('verifyAnswer with correct selection triggers victory', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    act(() => { VALID.forEach((i) => result.current.toggleCard(i)) })
    act(() => { result.current.verifyAnswer() })
    expect(result.current.victory).toEqual({ correct: 1, incorrect: 0 })
  })

  it('verifyAnswer with incomplete selection shows error', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    // Select only some valid indices — missing index 3 and 5
    act(() => { result.current.toggleCard(0) })
    act(() => { result.current.toggleCard(1) })
    act(() => { result.current.verifyAnswer() })
    expect(result.current.feedback?.type).toBe('error')
    expect(result.current.score.incorrect).toBe(1)
  })

  it('verifyAnswer with an invalid card selected shows error', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    act(() => { [...VALID, INVALID[0]].forEach((i) => result.current.toggleCard(i)) })
    act(() => { result.current.verifyAnswer() })
    expect(result.current.feedback?.type).toBe('error')
    expect(result.current.score.incorrect).toBe(1)
  })

  it('verifyAnswer does not clear selection on incorrect', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    act(() => { result.current.toggleCard(INVALID[0]) })
    act(() => { result.current.verifyAnswer() })
    // Selection stays so user can see and fix their mistake
    expect(result.current.selectedIndices).toContain(INVALID[0])
  })

  it('handleVictoryClose saves progress and navigates to /game4', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    act(() => { VALID.forEach((i) => result.current.toggleCard(i)) })
    act(() => { result.current.verifyAnswer() })
    act(() => { result.current.handleVictoryClose() })
    expect(mockNavigate).toHaveBeenCalledWith('/game4')
    const store = useGame4ProgressStore.getState()
    expect(store.getLevelResult('default', '1')).toMatchObject({ stars: 3, correct: 1, incorrect: 0 })
  })

  it('handleShowInstructions and handleCloseInstructions toggle modal', () => {
    const { result } = renderHook(() => useGame4('1'), { wrapper })
    expect(result.current.showInstructions).toBe(false)
    act(() => { result.current.handleShowInstructions() })
    expect(result.current.showInstructions).toBe(true)
    act(() => { result.current.handleCloseInstructions() })
    expect(result.current.showInstructions).toBe(false)
  })
})
