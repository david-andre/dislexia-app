import type { ReactNode } from 'react'

interface GridMenuItemProps {
  title: string
  description: string
  color: string
  preview: ReactNode
}

export default function GridMenuItem({ title, description, color, preview }: GridMenuItemProps) {
  return (
    <div className="gmi-card" style={{ '--gmi-accent': color } as React.CSSProperties}>
      <div className="gmi-card-preview">{preview}</div>
      <div className="gmi-card-body">
        <h2 className="gmi-card-title">{title}</h2>
        <p className="gmi-card-desc">{description}</p>
      </div>
      <div className="gmi-card-cta">Jugar →</div>
    </div>
  )
}
