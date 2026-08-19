import { useState } from 'react'
import Card from '@/components/CardsList/Card'

interface SyllableTargetAreaProps {
  completedSyllables: { taskName: string }[]
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, category: string) => void
  onUndoLast: () => void
  canUndo: boolean
}

export default function SyllableTargetArea({
  completedSyllables,
  onDragOver,
  onDrop,
  onUndoLast,
  canUndo,
}: SyllableTargetAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div
      className={`g2-zone g2-zone-target text-center${isDragOver ? ' g2-zone-dragover' : ''}`}
      onDragOver={onDragOver}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDragOver(false)
        }
      }}
      onDrop={(e) => {
        setIsDragOver(false)
        onDrop(e, 'Done')
      }}
      role="region"
      aria-labelledby="g2-target-heading"
      aria-describedby="g2-target-hint"
    >
      <span id="g2-target-heading" className="g2-zone-header font-luckiest-guy">
        Aquí
      </span>
      <p id="g2-target-hint" className="sr-only">
        Zona donde se forma la palabra. Suelta aquí las sílabas o colócalas con el
        teclado desde la izquierda.
      </p>
      <ul
        className="g2-syllable-list list-none p-0 m-0 flex w-full max-w-full flex-col items-stretch gap-2"
        aria-label={`Orden actual: ${completedSyllables.length ? completedSyllables.map((s) => s.taskName).join(', ') : 'vacío'}`}
      >
        {completedSyllables.map((task, i) => (
          <li key={`done-${task.taskName}-${i}`} className="g2-draggable card2">
            <Card content={task.taskName} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="g2-undo-btn mt-3 font-luckiest-guy"
        onClick={onUndoLast}
        disabled={!canUndo}
        aria-label="Quitar la última sílaba del orden"
      >
        Quitar última
      </button>
    </div>
  )
}
