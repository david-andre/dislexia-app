import type { Game2Level } from './types'

import camiseta from '@/assets/audio/camiseta.mp3'
import pecera from '@/assets/audio/pecera.mp3'
import florero from '@/assets/audio/florero.mp3'
import camioneta from '@/assets/audio/camioneta.mp3'
import telefono from '@/assets/audio/telefono.mp3'

export const game2Level1: Game2Level = {
  id: '1',
  title: 'Nivel 1',
  questions: [
    {
      syllables: ['MI', 'SE', 'TA', 'CA'],
      correctOrder: ['CA', 'MI', 'SE', 'TA'],
      audioUrl: camiseta,
    },
    {
      syllables: ['PE', 'CE', 'RA'],
      correctOrder: ['PE', 'CE', 'RA'],
      audioUrl: pecera,
    },
    {
      syllables: ['RO', 'RE', 'FLO'],
      correctOrder: ['FLO', 'RE', 'RO'],
      audioUrl: florero,
    },
    {
      syllables: ['CA', 'TA', 'NE', 'MIO'],
      correctOrder: ['CA', 'MIO', 'NE', 'TA'],
      audioUrl: camioneta,
    },
    {
      syllables: ['FO', 'LÉ', 'TE', 'NO'],
      correctOrder: ['TE', 'LÉ', 'FO', 'NO'],
      audioUrl: telefono,
    },
  ],
}

export const game2Level2: Game2Level = {
  id: '2',
  title: 'Nivel 2',
  questions: [
    {
      syllables: ['RO', 'FLO', 'RE'],
      correctOrder: ['FLO', 'RE', 'RO'],
      audioUrl: florero,
    },
    {
      syllables: ['TA', 'CA', 'MI', 'SE'],
      correctOrder: ['CA', 'MI', 'SE', 'TA'],
      audioUrl: camiseta,
    },
    {
      syllables: ['MIO', 'NE', 'TA', 'CA'],
      correctOrder: ['CA', 'MIO', 'NE', 'TA'],
      audioUrl: camioneta,
    },
    {
      syllables: ['NO', 'FO', 'LÉ', 'TE'],
      correctOrder: ['TE', 'LÉ', 'FO', 'NO'],
      audioUrl: telefono,
    },
    {
      syllables: ['RA', 'PE', 'CE'],
      correctOrder: ['PE', 'CE', 'RA'],
      audioUrl: pecera,
    },
  ],
}

export const GAME2_LEVELS: Game2Level[] = [game2Level1, game2Level2]
