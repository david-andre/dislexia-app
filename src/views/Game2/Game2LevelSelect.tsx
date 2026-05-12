import { GAME2_LEVELS } from '@/games/game2'
import { useAuthStore } from '@/stores/authStore'
import { useGame2ProgressStore } from '@/stores/game2ProgressStore'
import LevelSelectPage from '@/components/LevelSelectPage'
import '../game1.css'
import '../game2.css'

export default function Game2LevelSelect() {
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const getLevelResult = useGame2ProgressStore((s) => s.getLevelResult)
  const childId = selectedChild?.id ?? 'default'

  const levels = GAME2_LEVELS.map((l) => ({
    id: l.id,
    title: l.title,
    questionCount: l.questions.length,
  }))

  return (
    <LevelSelectPage
      levels={levels}
      basePath="/game2/level"
      bgClass="g1 g2"
      getLevelResult={getLevelResult}
      childId={childId}
    />
  )
}
