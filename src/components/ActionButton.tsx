import { BookOpen, Check, UserPlus } from 'lucide-react'

import './button.css'

interface ActionButtonProps {
  label?: string
  icon?: 'book' | 'check' | 'user-plus'
  color?: string
  fontSize?: string
  ariaLabel?: string
  handleAnswer: () => void
}

const iconMap = {
  book: BookOpen,
  check: Check,
  'user-plus': UserPlus,
}

export default function ActionButton({
  label,
  icon = 'book',
  color = 'bg-yellow-500',
  fontSize = 'text-4xl p-4',
  ariaLabel,
  handleAnswer,
}: ActionButtonProps) {
  const Icon = iconMap[icon] ?? BookOpen
  const content = label ? (
    <span>{label}</span>
  ) : (
    <Icon className="inline-block w-8 h-8" aria-hidden />
  )

  return (
    <button
      type="button"
      className={`start-btn font-luckiest-guy hover:bg-yellow-400 text-white rounded-3xl text-center m-auto ${color} ${fontSize}`}
      onClick={handleAnswer}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}
