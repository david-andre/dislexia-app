import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Home, BarChart3, ArrowLeft } from 'lucide-react'

import './button.css'

interface LinkButtonProps {
  to: string
  label?: string
  icon?: 'home' | 'chart' | 'back'
  color?: string
  fontSize?: string
}

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  chart: BarChart3,
  back: ArrowLeft,
}

export default function LinkButton({
  to,
  label,
  icon = 'home',
  color = 'bg-yellow-500',
  fontSize = 'text-4xl p-4',
}: LinkButtonProps) {
  const Icon = iconMap[icon] ?? Home
  const content = label ? (
    <span>{label}</span>
  ) : (
    <Icon className="inline-block w-8 h-8" />
  )

  return (
    <Link
      to={to}
      className={`start-btn font-luckiest-guy hover:bg-yellow-400 text-white rounded-3xl text-center m-auto ${color} ${fontSize}`}
    >
      {content}
    </Link>
  )
}
