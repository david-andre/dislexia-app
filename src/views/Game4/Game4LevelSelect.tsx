import { GAME4_LEVELS } from '@/games/game4'
import { useAuthStore } from '@/stores/authStore'
import { useGame4ProgressStore } from '@/stores/game4ProgressStore'
import LevelSelectPage from '@/components/LevelSelectPage'
import '../game1.css'
import '../game4.css'

export default function Game4LevelSelect() {
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const getLevelResult = useGame4ProgressStore((s) => s.getLevelResult)
  const childId = selectedChild?.id ?? 'default'

  const levels = GAME4_LEVELS.map((l) => ({
    id: l.id,
    title: l.title,
    questionCount: l.questions.length,
    subtitle: `${l.questions[0]?.targetLetter} vs ${l.questions[0]?.distractor}`,
  }))

  return (
    <LevelSelectPage
      levels={levels}
      basePath="/game4/level"
      bgClass="g1 g4"
      getLevelResult={getLevelResult}
      childId={childId}
    />
  )
}
