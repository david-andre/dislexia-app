import { useRef, useState } from 'react'
import Card from '@/components/CardsList/Card'

/** After a drag ends, some browsers fire a click on the source — skip one placement for that syllable. */
const SUPPRESS_CLICK_MS = 150

interface SyllableSourceAreaProps {
  syllables: { taskName: string }[]
  onDragStart: (e: React.DragEvent, taskName: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, category: string) => void
  /** Click or keyboard (Enter/Space): place syllable in target order without dragging */
  onAddToTarget: (taskName: string) => void
}

export default function SyllableSourceArea({
  syllables,
  onDragStart,
  onDragOver,
  onDrop,
  onAddToTarget,
}: SyllableSourceAreaProps) {
  const suppressPlacementFor = useRef<string | null>(null)
  const [draggingTaskName, setDraggingTaskName] = useState<string | null>(null)

  return (
    <div
      className="g2-zone g2-zone-source"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, 'inProgress')}
      role="region"
      aria-labelledby="g2-source-heading"
      aria-describedby="g2-source-hint"
    >
      <span id="g2-source-heading" className="g2-zone-header font-luckiest-guy">
        Arrastra desde aquí
      </span>
      <p id="g2-source-hint" className="sr-only">
        Cada sílaba se puede arrastrar al recuadro «Aquí», o bien pulsarla o usar
        Entrar o Espacio cuando esté enfocada para colocarla en orden.
      </p>
      {syllables.map((task, i) => (
        <div
          key={`${task.taskName}-${i}`}
          draggable
          tabIndex={0}
          role="button"
          aria-label={`Colocar sílaba ${task.taskName} en el orden en «Aquí». También puedes arrastrarla.`}
          className={`g2-draggable card2${draggingTaskName === task.taskName ? ' g2-card-dragging' : ''}`}
          onDragStart={(e) => {
            suppressPlacementFor.current = task.taskName
            setDraggingTaskName(task.taskName)
            onDragStart(e, task.taskName)
          }}
          onDragEnd={() => {
            setDraggingTaskName(null)
            const t = task.taskName
            window.setTimeout(() => {
              if (suppressPlacementFor.current === t) {
                suppressPlacementFor.current = null
              }
            }, SUPPRESS_CLICK_MS)
          }}
          onClick={() => {
            if (suppressPlacementFor.current === task.taskName) {
              suppressPlacementFor.current = null
              return
            }
            onAddToTarget(task.taskName)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onAddToTarget(task.taskName)
            }
          }}
        >
          <Card content={task.taskName} />
        </div>
      ))}
    </div>
  )
}
