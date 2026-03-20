import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import LinkButton from '@/components/LinkButton'
import ActionButton from '@/components/ActionButton'
import Card from '@/components/CardsList/Card'

const LIST = [['d', 'd', 'b', 'd', 'b', 'd', 'b', 'd', 'b']]

const VALID_INDICES = [0, 1, 3, 5, 7]
const INVALID_INDICES = [2, 4, 6, 8]

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

export default function Game6() {
  const navigate = useNavigate()
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
  }, [colors, score.incorrect, navigate])

  const row0 = LIST[0] ?? []

  return (
    <div className="g1 bg-gray-200 pb-7">
      <div className="py-10">
        <LinkButton
          to="/games"
          icon="home"
          color="bg-yellow-500"
          fontSize="text-4xl mt-12"
        />
      </div>
      <div className="flex ml-96 text-center mb-5">
        <div className="flex-initial">
          <Card content={row0[0] ?? ''} Bg />
        </div>
        <div className="flex-initial mt-11">
          <ActionButton
            icon="check"
            color="bg-green-500"
            fontSize="text-4xl mt-12"
            handleAnswer={verifyResult}
          />
        </div>
      </div>
      <div className="flex mx-60 text-center">
        {row0.slice(0, 3).map((item, i) => (
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
        {row0.slice(3, 6).map((item, i) => (
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
      <div className="flex mx-60 text-center">
        {row0.slice(6, 9).map((item, i) => (
          <div
            key={i + 6}
            role="button"
            tabIndex={0}
            onClick={() => toggleColor(i + 6)}
            onKeyDown={(e) => e.key === 'Enter' && toggleColor(i + 6)}
          >
            <Card content={item} changeBg backgroundColor={colors[i + 6]} />
          </div>
        ))}
      </div>
    </div>
  )
}
