import { GAME1_LEVELS } from '@/games/game1'
import { useAuthStore } from '@/stores/authStore'
import { useGame1ProgressStore } from '@/stores/game1ProgressStore'
import LevelSelectPage from '@/components/LevelSelectPage'
import '../game1.css'

export default function Game1LevelSelect() {
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const getLevelResult = useGame1ProgressStore((s) => s.getLevelResult)
  const childId = selectedChild?.id ?? 'default'

  const levels = GAME1_LEVELS.map((l) => ({
    id: l.id,
    title: l.title,
    questionCount: l.questions.length,
  }))

  return (
    <LevelSelectPage
      levels={levels}
      basePath="/game1/level"
      bgClass="g1"
      getLevelResult={getLevelResult}
      childId={childId}
    />
  )
}
