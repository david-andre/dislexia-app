import { useNavigate } from 'react-router-dom'
import { GAME4_LEVELS } from '@/games/game4'
import { useAuthStore } from '@/stores/authStore'
import { useGame4ProgressStore } from '@/stores/game4ProgressStore'
import LinkButton from '@/components/LinkButton'
import '../game1.css'
import '../game4.css'

export default function Game4LevelSelect() {
  const navigate = useNavigate()
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const getLevelResult = useGame4ProgressStore((s) => s.getLevelResult)
  const childId = selectedChild?.id ?? 'default'

  return (
    <div className="g1 g4 min-h-screen pt-6 pb-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <LinkButton
          to="/games"
          icon="back"
          color="bg-amber-500 hover:bg-amber-600"
          fontSize="text-2xl p-3 min-w-[3rem] min-h-[3rem]"
          ariaLabel="Volver a juegos"
        />
        <h1 className="font-luckiest-guy text-2xl sm:text-3xl text-white text-center flex-1">
          Elige el nivel
        </h1>
        <div className="w-12" aria-hidden />
      </div>

      <div
        className="flex flex-col gap-4 max-w-md mx-auto"
        role="list"
        aria-label="Niveles disponibles"
      >
        {GAME4_LEVELS.map((level) => {
          const result = getLevelResult(childId, level.id)
          const stars = result?.stars ?? 0
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => navigate(`/game4/level/${level.id}`)}
              className="g1-level-card w-full text-left px-6 py-4 rounded-xl font-luckiest-guy text-xl text-white bg-white/20 hover:bg-white/35 transition-colors shadow-md border-2 border-white/40 flex items-center justify-between gap-4"
              aria-label={`${level.title}. ${level.questions.length} ${level.questions.length === 1 ? 'pregunta' : 'preguntas'}.${stars > 0 ? ` Completado con ${stars} estrellas.` : ''} Empezar nivel.`}
            >
              <div>
                <span className="block">{level.title}</span>
                <span className="block text-base opacity-90 mt-1">
                  {level.questions[0]?.targetLetter} vs {level.questions[0]?.distractor}
                </span>
              </div>
              {stars > 0 && (
                <span className="text-3xl text-amber-300 flex-shrink-0" aria-hidden>
                  {'★'.repeat(stars)}
                  {'☆'.repeat(3 - stars)}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
