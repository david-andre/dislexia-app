import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import LinkButton from '@/components/LinkButton'
import ActionButton from '@/components/ActionButton'
import Card from '@/components/CardsList/Card'
import { useAuthStore } from '@/stores/authStore'
import { useSubmitActivity } from '@/hooks/useSubmitActivity'

const LIST = ['p', 'p', 'q', 'p', 'q', 'p']

const VALID_INDICES = [0, 1, 3, 5]
const INVALID_INDICES = [2, 4]

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

export default function Game4() {
  const navigate = useNavigate()
  const selectedChild = useAuthStore((s) => s.selectedChild)
  const submitActivity = useSubmitActivity()

  const [colors, setColors] = useState<Record<number, string>>({})
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })

  const toggleColor = useCallback((index: number) => {
    setColors((prev) => ({
      ...prev,
      [index]: prev[index] === '#FCD34D' ? '' : '#FCD34D',
    }))
  }, [])

  const verifyResult = useCallback(async () => {
    const valid = VALID_INDICES.every((i) => colors[i] === '#FCD34D')
    const invalid = INVALID_INDICES.every((i) => colors[i] !== '#FCD34D')

    if (valid && invalid) {
      await Swal.fire({
        title: 'GANASTE!',
        timer: 4000,
        imageUrl:
          'https://i.pinimg.com/originals/7a/55/bd/7a55bd283db2443f1761ebabff200bc6.gif',
        showConfirmButton: false,
        html: `Correctos: <b>1 punto</b> <br> Incorrectos: <b>${score.incorrect} puntos</b> ${getStarsHtml(score.incorrect)}`,
      })
      submitActivity.mutate({
        nombre: 'Identificacion Visual 1',
        correctas: 1,
        incorrectas: score.incorrect,
        usuario: selectedChild?.id ?? '',
      })
      navigate('/games')
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Inténtalo de nuevo',
        showConfirmButton: false,
        timer: 1500,
      })
      setScore((s) => ({ ...s, incorrect: s.incorrect + 1 }))
    }
  }, [colors, score.incorrect, selectedChild, submitActivity, navigate])

  const showInstructions = useCallback(() => {
    void Swal.fire({ title: 'Instrucción 1', text: 'Descripción' })
  }, [])

  return (
    <div className="g1 h-screen pb-7">
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
      <div className="flex ml-96 text-center mb-5">
        <div className="flex-initial">
          <Card content={LIST[0]} Bg />
        </div>
        <div className="flex-initial mt-11">
          <ActionButton
            icon="check"
            color="bg-green-500"
            fontSize="text-4xl mt-12 ml-5 p-4"
            handleAnswer={verifyResult}
          />
        </div>
      </div>
      <div className="flex mx-60 text-center">
        {LIST.slice(0, 3).map((item, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => toggleColor(i)}
            onKeyDown={(e) => e.key === 'Enter' && toggleColor(i)}
          >
            <Card content={item} changeBg backgroundColor={colors[i]} />
          </div>
        ))}
      </div>
      <div className="flex mx-60 my-3 text-center">
        {LIST.slice(3, 6).map((item, i) => (
          <div
            key={i + 3}
            role="button"
            tabIndex={0}
            onClick={() => toggleColor(i + 3)}
            onKeyDown={(e) => e.key === 'Enter' && toggleColor(i + 3)}
          >
            <Card content={item} changeBg backgroundColor={colors[i + 3]} />
          </div>
        ))}
      </div>
    </div>
  )
}
