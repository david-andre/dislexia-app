import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import LinkButton from '@/components/LinkButton'
import ActionButton from '@/components/ActionButton'
import Card from '@/components/CardsList/Card'
import { useAuthStore } from '@/stores/authStore'
import { useSubmitActivity } from '@/hooks/useSubmitActivity'

import camiseta from '@/assets/audio/camiseta.mp3'
import pecera from '@/assets/audio/pecera.mp3'
import florero from '@/assets/audio/florero.mp3'
import camioneta from '@/assets/audio/camioneta.mp3'
import telefono from '@/assets/audio/telefono.mp3'

import './game2.css'

const AUDIO_BY_INDEX: Record<number, string> = {
  0: camiseta,
  1: pecera,
  2: florero,
  3: camioneta,
  4: telefono,
}

interface Task {
  taskName: string
  type: string
}

const INITIAL_TASKS: Task[] = [
  { taskName: 'MI', type: 'inProgress' },
  { taskName: 'SE', type: 'inProgress' },
  { taskName: 'TA', type: 'inProgress' },
  { taskName: 'CA', type: 'inProgress' },
]

const OPTIONS: Task[][] = [
  [
    { taskName: 'PE', type: 'inProgress' },
    { taskName: 'CE', type: 'inProgress' },
    { taskName: 'RA', type: 'inProgress' },
  ],
  [
    { taskName: 'RO', type: 'inProgress' },
    { taskName: 'RE', type: 'inProgress' },
    { taskName: 'FLO', type: 'inProgress' },
  ],
  [
    { taskName: 'CA', type: 'inProgress' },
    { taskName: 'TA', type: 'inProgress' },
    { taskName: 'NE', type: 'inProgress' },
    { taskName: 'MIO', type: 'inProgress' },
  ],
  [
    { taskName: 'FO', type: 'inProgress' },
    { taskName: 'LÉ', type: 'inProgress' },
    { taskName: 'TE', type: 'inProgress' },
    { taskName: 'NO', type: 'inProgress' },
  ],
  [{ taskName: '', type: 'inProgress' }],
]

const CORRECT_WORDS = ['CA,MI,SE,TA', 'PE,CE,RA', 'FLO,RE,RO', 'CA,MIO,NE,TA', 'TE,LÉ,FO,NO']

function getStarsHtml(incorrect: number) {
  const filled = incorrect > 2 ? 1 : incorrect === 0 ? 3 : 2
  return '★'
    .repeat(3)
    .split('')
    .map((s, i) =>
      i < filled
        ? `<span style="color:orange;font-size:100px">${s}</span>`
        : `<span style="font-size:100px">${s}</span>`
    )
    .join('')
}

export default function Game2() {
  const navigate = useNavigate()
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const submitActivity = useSubmitActivity()

  const [tasks, setTasks] = useState<Task[]>(() => [...INITIAL_TASKS])
  const [options, setOptions] = useState<Task[][]>(() => OPTIONS.map((o) => [...o]))
  const [correctWord, setCorrectWord] = useState<string[]>(() => [...CORRECT_WORDS])
  const [completedWord, setCompletedWord] = useState<string[]>([])
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })

  const onDragStart = useCallback((e: React.DragEvent, taskName: string) => {
    e.dataTransfer.setData('taskName', taskName)
  }, [])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent, cat: string) => {
      const taskName = e.dataTransfer.getData('taskName')
      setCompletedWord((prev) => [...prev, taskName])
      setTasks((prev) => {
        const next = prev.map((t) =>
          t.taskName === taskName ? { ...t, type: cat } : t
        )
        const allDone = next.every((t) => t.type !== 'inProgress')
        if (allDone) {
          const expected = correctWord[0]
          const actual = [...completedWord, taskName].join(',')
          if (actual === expected) {
            setScore((s) => ({ ...s, correct: s.correct + 1 }))
            setTasks(options[0] ?? [])
            setOptions((o) => o.slice(1))
            setCorrectWord((c) => c.slice(1))
            setCompletedWord([])
            void Swal.fire({
              icon: 'success',
              title: 'Bien hecho',
              showConfirmButton: false,
              timer: 1500,
            })
          } else {
            setScore((s) => ({ ...s, incorrect: s.incorrect + 1 }))
            setTasks((t) => t.map((x) => ({ ...x, type: 'inProgress' })))
            setCompletedWord([])
            void Swal.fire({
              icon: 'error',
              title: 'Inténtalo de nuevo',
              showConfirmButton: false,
              timer: 1500,
            })
          }
          if (score.correct + 1 >= 5) {
            void Swal.fire({
              title: 'GANASTE!',
              timer: 4000,
              imageUrl:
                'https://i.pinimg.com/originals/7a/55/bd/7a55bd283db2443f1761ebabff200bc6.gif',
              showConfirmButton: false,
              html: `Correctos: <b>${score.correct + 1} puntos</b> <br> Incorrectos: <b>${score.incorrect} puntos</b> ${getStarsHtml(score.incorrect)}`,
            })
            submitActivity.mutate({
              nombre: 'Conciencia Fonologica 1',
              correctas: score.correct + 1,
              incorrectas: score.incorrect,
              usuario: selectedChild?.id ?? '',
            })
            navigate('/games')
          }
        }
        return next
      })
    },
    [correctWord, completedWord, options, score, selectedChild, submitActivity, navigate]
  )

  const playAudio = useCallback(() => {
    const src = AUDIO_BY_INDEX[score.correct]
    if (src) new Audio(src).play().catch(() => {})
  }, [score.correct])

  const showInstructions = useCallback(() => {
    void Swal.fire({ title: 'Instrucción 1', text: 'Descripción' })
  }, [])

  const inProgress = tasks.filter((t) => t.type === 'inProgress')
  const done = tasks.filter((t) => t.type === 'Done')

  return (
    <div className="g1 h-screen mb-12">
      <div className="inline-flex mt-6">
        <LinkButton
          to="/games"
          icon="home"
          color="bg-yellow-500"
          fontSize="flex-1 text-4xl p-4 mx-2"
        />
        <ActionButton
          icon="book"
          color="bg-blue-500"
          fontSize="flex-1 text-4xl p-4"
          handleAnswer={showInstructions}
        />
      </div>
      <p className="font-luckiest-guy text-5xl text-gray-200 mb-6 text-center">
        Puntaje: {score.correct}
      </p>
      <div className="drag-container">
        <div
          className="inProgress"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, 'inProgress')}
        >
          {inProgress.map((task, i) => (
            <div
              key={`${task.taskName}-${i}`}
              draggable
              onDragStart={(e) => onDragStart(e, task.taskName)}
              className="draggable card2"
            >
              <Card content={task.taskName} />
            </div>
          ))}
        </div>
        <div
          className="droppable text-center"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, 'Done')}
        >
          <span className="group-header font-luckiest-guy text-gray-200 text-4xl">
            Aquí
          </span>
          {done.map((task, i) => (
            <div key={`done-${i}`} className="draggable card2">
              <Card content={task.taskName} />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="text-9xl text-gray-900 inline-block align-top mt-16 cursor-pointer"
          onClick={playAudio}
          aria-label="Reproducir audio"
        >
          🔊
        </button>
        <p className="font-luckiest-guy px-20 mx-3 text-9xl text-gray-200">
          {completedWord.join(',')}
        </p>
      </div>
    </div>
  )
}
