import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useGame1 } from './useGame1'
import { useAuthStore } from '@/stores/authStore'
import { useGame1ProgressStore } from '@/stores/game1ProgressStore'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/hooks/useSubmitActivity', () => ({
  useSubmitActivity: () => ({
    mutate: vi.fn(),
  }),
}))

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/game1/level/1']}>
      {children}
    </MemoryRouter>
  )
}

describe('useGame1', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({ selectedChild: null })
    useGame1ProgressStore.setState({ byChild: {} })
  })

  it('returns null level when levelId is invalid', () => {
    const { result } = renderHook(() => useGame1('invalid'), { wrapper })
    expect(result.current.level).toBeNull()
  })

  it('returns level when levelId is valid', () => {
    const { result } = renderHook(() => useGame1('1'), { wrapper })
    expect(result.current.level).not.toBeNull()
    expect(result.current.level?.id).toBe('1')
  })

  it('handleSelect updates the current syllable', () => {
    const { result } = renderHook(() => useGame1('1'), { wrapper })
    expect(result.current.currentSyllables).toContain('')
    act(() => {
      result.current.handleSelect('MI')
    })
    expect(result.current.currentSyllables[1]).toBe('MI')
  })

  it('validateAnswer sets success feedback when correct', () => {
    const { result } = renderHook(() => useGame1('1'), { wrapper })
    act(() => {
      result.current.handleSelect('MI')
    })
    act(() => {
      result.current.validateAnswer()
    })
    expect(result.current.feedback).toEqual({ type: 'success', message: 'Correcto' })
    expect(result.current.score.correct).toBe(1)
  })

  it('validateAnswer sets error feedback when incorrect', () => {
    const { result } = renderHook(() => useGame1('1'), { wrapper })
    act(() => {
      result.current.handleSelect('TI')
    })
    act(() => {
      result.current.validateAnswer()
    })
    expect(result.current.feedback).toEqual({
      type: 'error',
      message: 'Inténtalo de nuevo',
    })
    expect(result.current.score.incorrect).toBe(1)
  })
})
