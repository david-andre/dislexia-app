import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '@/stores/authStore'
import { useGame1ProgressStore } from '@/stores/game1ProgressStore'
import { useGame2ProgressStore } from '@/stores/game2ProgressStore'
import { useGame4ProgressStore } from '@/stores/game4ProgressStore'
import { computeSkillProfile, SKILL_KEYS, SKILL_META } from '@/skills'
import type { SkillKey, SkillProfile } from '@/skills'
import AnimatedJumbotron from '@/components/AnimatedJumbotron'
import LinkButton from '@/components/LinkButton'
import SkillsRadar from '@/components/SkillsRadar'
import './game1.css'
import './profile.css'

// ── Helpers ──────────────────────────────────────────────────────────────────

function confidenceBadge(confidence: number) {
  if (confidence === 0)
    return { label: 'Sin datos', cls: 'skill-confidence-badge--none' }
  if (confidence < 0.75)
    return { label: 'Parcial', cls: 'skill-confidence-badge--partial' }
  return { label: 'Completo', cls: 'skill-confidence-badge--full' }
}

function interpretation(profile: SkillProfile) {
  const strengths: SkillKey[] = []
  const developing: SkillKey[] = []
  const needsPractice: SkillKey[] = []
  const noData: SkillKey[] = []

  for (const key of SKILL_KEYS) {
    const { score, confidence } = profile[key]
    if (confidence === 0) { noData.push(key); continue }
    if (score >= 75) strengths.push(key)
    else if (score >= 45) developing.push(key)
    else needsPractice.push(key)
  }

  return { strengths, developing, needsPractice, noData }
}

const jumbotronProps = {
  content: ['Perfil', ''] as [string, string],
  style: 'flex-1 text-center',
  text: 'text-4xl sm:text-5xl',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SkillRow({ skillKey, profile }: { skillKey: SkillKey; profile: SkillProfile }) {
  const meta = SKILL_META[skillKey]
  const { score, confidence } = profile[skillKey]
  const badge = confidenceBadge(confidence)
  const levelsPlayed = Math.round(confidence * meta.totalLevels)

  // Extract a solid colour for bar fill (replace alpha with 1)
  const solidColor = meta.color.replace(/[\d.]+\)$/, '1)')

  return (
    <div className="skill-row">
      <div className="skill-row-accent" style={{ background: solidColor }} />
      <div className="skill-row-body">
        <div className="skill-row-header">
          <span className="skill-row-label">{meta.label}</span>
          <span className="skill-row-score" style={{ color: solidColor }}>
            {score}
          </span>
        </div>
        <div className="skill-bar-track">
          <div
            className="skill-bar-fill"
            style={{ width: `${score}%`, background: solidColor }}
          />
        </div>
        <div className="skill-row-meta">
          <span>{meta.description}</span>
          <span className={`skill-confidence-badge ${badge.cls}`}>
            {confidence === 0
              ? badge.label
              : `${levelsPlayed}/${meta.totalLevels} niveles`}
          </span>
        </div>
      </div>
    </div>
  )
}

function InterpretationCard({ profile }: { profile: SkillProfile }) {
  const { strengths, developing, needsPractice, noData } = interpretation(profile)
  const hasAny = strengths.length + developing.length + needsPractice.length > 0

  return (
    <div className="profile-card">
      <h2 className="font-luckiest-guy text-xl text-[#1e3a5f] mb-4">
        Interpretación OG
      </h2>
      {!hasAny ? (
        <p className="text-slate-500 text-sm">
          Completa al menos una actividad para ver la interpretación.
        </p>
      ) : (
        <div className="interpretation-section">
          {strengths.length > 0 && (
            <div className="interpretation-group">
              <div className="interpretation-dot bg-green-500" />
              <p className="interpretation-label">
                <strong>Fortaleza — </strong>
                {strengths.map((k) => SKILL_META[k].label).join(', ')}
              </p>
            </div>
          )}
          {developing.length > 0 && (
            <div className="interpretation-group">
              <div className="interpretation-dot bg-amber-400" />
              <p className="interpretation-label">
                <strong>En desarrollo — </strong>
                {developing.map((k) => SKILL_META[k].label).join(', ')}
              </p>
            </div>
          )}
          {needsPractice.length > 0 && (
            <div className="interpretation-group">
              <div className="interpretation-dot bg-red-400" />
              <p className="interpretation-label">
                <strong>Necesita práctica — </strong>
                {needsPractice.map((k) => SKILL_META[k].label).join(', ')}
              </p>
            </div>
          )}
          {noData.length > 0 && (
            <div className="interpretation-group">
              <div className="interpretation-dot bg-slate-300" />
              <p className="interpretation-label">
                <strong>Sin datos — </strong>
                {noData.map((k) => SKILL_META[k].label).join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Profile() {
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const childId = selectedChild?.id ?? 'default'
  const childName = selectedChild
    ? `${selectedChild.nombre} ${selectedChild.apellido}`.trim()
    : 'Perfil general'

  const g1 = useGame1ProgressStore(useShallow((s) => s.byChild[childId] ?? {}))
  const g2 = useGame2ProgressStore(useShallow((s) => s.byChild[childId] ?? {}))
  const g4 = useGame4ProgressStore(useShallow((s) => s.byChild[childId] ?? {}))

  const profile = useMemo(() => computeSkillProfile(g1, g2, g4), [g1, g2, g4])

  return (
    <div className="g1 min-h-full px-4 pt-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <LinkButton
          to="/games"
          icon="back"
          color="bg-blue-500 hover:bg-blue-600"
          fontSize="text-2xl p-3 min-w-[3rem] min-h-[3rem]"
          ariaLabel="Volver a actividades"
        />
        <AnimatedJumbotron features={jumbotronProps} />
        <div className="w-12" aria-hidden />
      </div>

      <p className="text-center text-white/80 text-sm mb-8 font-luckiest-guy tracking-wide">
        {childName}
      </p>

      {/* Main grid */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 items-start">
        {/* Radar chart */}
        <div className="profile-card">
          <h2 className="font-luckiest-guy text-xl text-[#1e3a5f] mb-4 text-center">
            Mapa de Habilidades
          </h2>
          <SkillsRadar profile={profile} />
        </div>

        {/* Skill rows */}
        <div className="flex flex-col gap-3">
          {SKILL_KEYS.map((key) => (
            <SkillRow key={key} skillKey={key} profile={profile} />
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="max-w-5xl mx-auto mt-6">
        <InterpretationCard profile={profile} />
      </div>
    </div>
  )
}
