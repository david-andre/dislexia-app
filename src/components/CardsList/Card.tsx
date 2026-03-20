import { useState, useCallback } from 'react'
import { Volume2 } from 'lucide-react'

import mi from '@/assets/audio/mi.mp3'
import ni from '@/assets/audio/ni.mp3'
import ti from '@/assets/audio/ti.mp3'
import se from '@/assets/audio/se.mp3'
import ce from '@/assets/audio/ce.mp3'
import te from '@/assets/audio/te.mp3'
import ta from '@/assets/audio/ta.mp3'
import re from '@/assets/audio/re.mp3'
import me from '@/assets/audio/me.mp3'
import ne from '@/assets/audio/ne.mp3'
import pe from '@/assets/audio/pe.mp3'
import mo from '@/assets/audio/mo.mp3'
import po from '@/assets/audio/po.mp3'
import fo from '@/assets/audio/fo.mp3'
import ca from '@/assets/audio/ca.mp3'
import ra from '@/assets/audio/ra.mp3'
import ro from '@/assets/audio/ro.mp3'
import flo from '@/assets/audio/flo.mp3'
import mio from '@/assets/audio/mio.mp3'
import le from '@/assets/audio/le.mp3'
import no from '@/assets/audio/no.mp3'
import qu from '@/assets/audio/qu.mp3'
import eme from '@/assets/audio/eme.mp3'
import ene from '@/assets/audio/ene.mp3'
import be from '@/assets/audio/be.mp3'
import de from '@/assets/audio/de.mp3'

const AUDIO_MAP: Record<string, string> = {
  MI: mi,
  NI: ni,
  TI: ti,
  SE: se,
  CE: ce,
  TE: te,
  TA: ta,
  RE: re,
  ME: me,
  NE: ne,
  PE: pe,
  MO: mo,
  PO: po,
  FO: fo,
  CA: ca,
  RA: ra,
  RO: ro,
  FLO: flo,
  MIO: mio,
  'LÉ': le,
  NO: no,
  m: eme,
  n: ene,
  b: be,
  d: de,
  q: qu,
  p: pe,
}

interface CardProps {
  content: string
  handleClick?: (content: string) => void
  changeBg?: boolean
  Bg?: boolean
  backgroundColor?: string
}

export default function Card({ content, handleClick, changeBg, Bg, backgroundColor }: CardProps) {
  const [bg, setBg] = useState('card bg-red-600')

  const playAudio = useCallback(() => {
    const src = AUDIO_MAP[content] ?? AUDIO_MAP[content.toLowerCase()]
    if (!src) return
    const audio = new Audio(src)
    audio.play().catch(() => {})
  }, [content])

  const toggleBg = useCallback(() => {
    setBg((prev) =>
      prev === 'card bg-red-600' ? 'card bg-yellow-600' : 'card bg-red-600'
    )
  }, [])

  const baseContent = (
    <>
      <span>{content} </span>
      <Volume2
        className="inline-block w-6 h-6 align-text-top cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          playAudio()
        }}
      />
    </>
  )

  if (handleClick) {
    return (
      <div className="card bg-red-600" onClick={() => handleClick(content)}>
        <div className="card_title title-white">
          <p className="font-luckiest-guy">{baseContent}</p>
        </div>
      </div>
    )
  }

  if (changeBg) {
    const displayBg =
      backgroundColor !== undefined
        ? `card ${backgroundColor ? 'bg-yellow-600' : 'bg-red-600'}`
        : bg
    const isControlled = backgroundColor !== undefined
    return (
      <div
        className={displayBg}
        onClick={isControlled ? undefined : toggleBg}
        onKeyDown={
          isControlled ? undefined : (e) => e.key === 'Enter' && toggleBg()
        }
        role={isControlled ? undefined : 'button'}
        tabIndex={isControlled ? undefined : 0}
      >
        <div className="card_title title-white">
          <p className="text-7xl">{baseContent}</p>
        </div>
      </div>
    )
  }

  if (Bg) {
    return (
      <div className="card bg-yellow-600">
        <div className="card_title title-white">
          <p className="text-7xl">{baseContent}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-red-600">
      <div className="card_title title-white">
        <p className="font-luckiest-guy text-7xl">{baseContent}</p>
      </div>
    </div>
  )
}
