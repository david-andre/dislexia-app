import { useMemo } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { SKILL_KEYS, SKILL_META } from '@/skills'
import type { SkillProfile } from '@/skills'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface SkillsRadarProps {
  profile: SkillProfile
}

const RADAR_OPTIONS = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25,
        color: '#64748b',
        font: { size: 11 },
        backdropColor: 'transparent',
      },
      pointLabels: {
        color: '#1e3a5f',
        font: { size: 12, weight: 'bold' as const },
      },
      grid: { color: 'rgba(30, 58, 95, 0.15)' },
      angleLines: { color: 'rgba(30, 58, 95, 0.2)' },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { parsed: { r: number } }) => ` ${ctx.parsed.r} / 100`,
      },
    },
  },
}

export default function SkillsRadar({ profile }: SkillsRadarProps) {
  const hasAnyData = SKILL_KEYS.some((k) => profile[k].confidence > 0)

  const data = useMemo(() => ({
    labels: SKILL_KEYS.map((k) => SKILL_META[k].label),
    datasets: [
      {
        label: 'Perfil de Habilidades',
        data: SKILL_KEYS.map((k) => profile[k].score),
        backgroundColor: 'rgba(91, 155, 213, 0.25)',
        borderColor: 'rgba(91, 155, 213, 0.9)',
        borderWidth: 2.5,
        pointBackgroundColor: SKILL_KEYS.map((k) => SKILL_META[k].color),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }), [profile])

  return (
    <div className="relative">
      <Radar data={data} options={RADAR_OPTIONS} />
      {!hasAnyData && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-slate-400 text-sm text-center px-4">
            Completa actividades para ver tu perfil
          </p>
        </div>
      )}
    </div>
  )
}
