import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import LinkButton from '@/components/LinkButton'
import ActionButton from '@/components/ActionButton'
import CardsList from '@/components/CardsList/CardsList'
import { useAuthStore } from '@/stores/authStore'
import { useSubmitActivity } from '@/hooks/useSubmitActivity'

import camiseta from '@/assets/audio/camiseta.mp3'
import pecera from '@/assets/audio/pecera.mp3'
import florero from '@/assets/audio/florero.mp3'
import camioneta from '@/assets/audio/camioneta.mp3'
import telefono from '@/assets/audio/telefono.mp3'

import './game1.css'

const AUDIO_BY_INDEX: Record<number, string> = {
  0: camiseta,
  1: pecera,
  2: florero,
  3: camioneta,
  4: telefono,
}

const GAME_WORDS = [
  ['CA', '', 'SE', 'TA'],
  ['PE', '', 'RA'],
  ['FLO', '', 'RO'],
  ['CAMIO', '', 'TA'],
  ['TELÉ', '', 'NO'],
  ['', '', ''],
]

const WORD_OPTIONS = [
  [{ text: 'MI', val: true }, { text: 'TI' }, { text: 'NI' }],
  [{ text: 'SE' }, { text: 'CE', val: true }, { text: 'TE' }],
  [{ text: 'RE', val: true }, { text: 'ME' }, { text: 'NE' }],
  [{ text: 'ME' }, { text: 'PE' }, { text: 'NE', val: true }],
  [{ text: 'MO' }, { text: 'PO' }, { text: 'FO', val: true }],
  [{ text: '' }, { text: '' }, { text: '' }],
]

function getStarsHtml(incorrect: number) {
  const filled = incorrect > 2 ? 1 : incorrect === 0 ? 3 : 2
  const stars = '★'.repeat(3)
    .split('')
    .map((s, i) =>
      i < filled
        ? `<span style="color:orange;font-size:100px">${s}</span>`
        : `<span style="font-size:100px">${s}</span>`
    )
    .join('')
  return `<br><div>${stars}</div>`
}

export default function Game1() {
  const navigate = useNavigate()
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const submitActivity = useSubmitActivity()

  const [gameWords, setGameWords] = useState<string[][]>(() =>
    GAME_WORDS.map((w) => [...w])
  )
  const [wordOptions, setWordOptions] = useState(() => [...WORD_OPTIONS])
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })

  const handleClick = useCallback((content: string) => {
    setGameWords((prev) => {
      const next = prev.map((row) => [...row])
      if (next[0]) next[0][1] = content
      return next
    })
  }, [])

  const playAudio = useCallback(() => {
    const src = AUDIO_BY_INDEX[score.correct]
    if (src) new Audio(src).play().catch(() => {})
  }, [score.correct])

  const showInstructions = useCallback(() => {
    void Swal.fire({
      title: 'Instrucción 1',
      text: 'Descripción',
      confirmButtonColor: '#3085d6',
    })
  }, [])

  const validateAnswer = useCallback(async () => {
    const correct = wordOptions[0]?.find((o) => o.val === true)
    const currentBlank = gameWords[0]?.[1]

    if (currentBlank === correct?.text) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }))
      setGameWords((prev) => prev.slice(1))
      setWordOptions((prev) => prev.slice(1))
      await Swal.fire({
        icon: 'success',
        title: 'Correcto',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      setScore((s) => ({ ...s, incorrect: s.incorrect + 1 }))
      await Swal.fire({
        icon: 'error',
        title: 'Inténtalo de nuevo',
        showConfirmButton: false,
        timer: 1500,
      })
    }

    const newCorrect = currentBlank === correct?.text ? score.correct + 1 : score.correct
    if (newCorrect >= 5) {
      await Swal.fire({
        title: 'GANASTE!',
        timer: 4000,
        imageUrl: 'https://i.pinimg.com/originals/7a/55/bd/7a55bd283db2443f1761ebabff200bc6.gif',
        showConfirmButton: false,
        html: `Correctos: <b>${newCorrect} puntos</b> <br> Incorrectos: <b>${score.incorrect} puntos</b> ${getStarsHtml(score.incorrect)}`,
      })
      const userId = selectedChild?.id ?? ''
      submitActivity.mutate({
        nombre: 'Discriminacion auditiva 1',
        correctas: newCorrect,
        incorrectas: score.incorrect,
        usuario: userId,
      })
      navigate('/games')
    }
  }, [gameWords, wordOptions, score, selectedChild, submitActivity, navigate])

  const items = gameWords[0]?.map((item, index) => {
    if (item === '') {
      return (
        <p
          key={index}
          className="font-luckiest-guy border-dashed border-4 border-red-600 rounded-3xl px-20 mx-3"
        />
      )
    }
    const found = wordOptions[0]?.find((o) => o.text === item)
    if (found) {
      return (
        <p
          key={index}
          className="font-luckiest-guy border-dashed border-4 border-red-600 rounded-3xl text-red-600 px-5 mx-3 text-9xl"
        >
          {item}
        </p>
      )
    }
    return (
      <p key={index} className="font-luckiest-guy text-white text-9xl">
        {item}
      </p>
    )
  })

  return (
    <div className="g1 h-screen overflow-auto">
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
      <div className="flex-1 mt-3">
        <p className="font-luckiest-guy text-4xl sm:text-5xl text-white mb-6 text-center">
          Puntaje: {score.correct}
        </p>
        <CardsList options={wordOptions} handleClick={handleClick} />
        <div className="text-center mt-8">
          <ActionButton
            icon="check"
            color="bg-yellow-400"
            fontSize="text-4xl p-4"
            handleAnswer={validateAnswer}
          />
          <br />
          <div className="inline-flex mt-12">{items}</div>
          <button
            type="button"
            className="inline-block align-top mt-16 cursor-pointer text-2xl text-gray-900"
            onClick={playAudio}
            aria-label="Reproducir audio"
          >
            🔊
          </button>
        </div>
      </div>
    </div>
  )
}
