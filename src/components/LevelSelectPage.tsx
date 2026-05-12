import { useNavigate } from 'react-router-dom'
import LinkButton from '@/components/LinkButton'
import './LevelSelectPage.css'

const CARD_COLORS = [
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#10b981', // green
  '#3b82f6', // blue
  '#f97316', // orange
  '#ec4899', // pink
  '#06b6d4', // cyan
]

interface Level {
  id: string
  title: string
  questionCount: number
  subtitle?: string
}

interface LevelSelectPageProps {
  levels: Level[]
  basePath: string
  bgClass: string
  getLevelResult: (childId: string, levelId: string) => { stars: number } | undefined
  childId: string
}

export default function LevelSelectPage({
  levels,
  basePath,
  bgClass,
  getLevelResult,
  childId,
}: LevelSelectPageProps) {
  const navigate = useNavigate()

  return (
    <div className={`${bgClass} min-h-full pt-6 pb-12 px-4`}>
      <div className="flex justify-between items-center mb-10">
        <LinkButton
          to="/games"
          icon="back"
          color="bg-amber-500 hover:bg-amber-600"
          fontSize="text-2xl p-3 min-w-[3rem] min-h-[3rem]"
          ariaLabel="Volver a juegos"
        />
        <h1
          className="font-luckiest-guy text-3xl sm:text-4xl text-white text-center flex-1"
          style={{ textShadow: '0 3px 8px rgba(0,0,0,0.2)' }}
        >
          ¡Elige tu nivel!
        </h1>
        <div className="w-12" aria-hidden />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
        {levels.map((level, index) => {
          const result = getLevelResult(childId, level.id)
          const stars = result?.stars ?? 0
          const done = stars > 0
          const color = CARD_COLORS[index % CARD_COLORS.length]

          return (
            <button
              key={level.id}
              type="button"
              className={`level-card${done ? ' level-card--done' : ''}`}
              style={{ '--card-color': color } as React.CSSProperties}
              onClick={() => navigate(`${basePath}/${level.id}`)}
              aria-label={`Nivel ${index + 1}: ${level.title}. ${level.questionCount} preguntas.${stars > 0 ? ` ${stars} estrellas.` : ''}`}
            >
              {done && <div className="level-card__check">✓</div>}

              <span className="level-card__number">{index + 1}</span>

              <div className="flex flex-col items-center gap-0.5">
                <span className="level-card__title">{level.title}</span>
                {level.subtitle && (
                  <span className="level-card__subtitle">{level.subtitle}</span>
                )}
              </div>

              <div className="level-card__stars">
                {Array.from({ length: 3 }, (_, i) => (
                  <span
                    key={i}
                    className={i < stars ? 'level-card__star--filled' : 'level-card__star--empty'}
                  >
                    ★
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
