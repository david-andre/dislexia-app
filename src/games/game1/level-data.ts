import type { Game1Level } from './types'

import camiseta from '@/assets/audio/camiseta.mp3'
import pecera from '@/assets/audio/pecera.mp3'
import florero from '@/assets/audio/florero.mp3'
import camioneta from '@/assets/audio/camioneta.mp3'
import telefono from '@/assets/audio/telefono.mp3'

export const game1Level1: Game1Level = {
  id: '1',
  title: 'Nivel 1',
  questions: [
    {
      syllables: ['CA', '', 'SE', 'TA'],
      options: [
        { text: 'MI', isCorrect: true },
        { text: 'TI', isCorrect: false },
        { text: 'NI', isCorrect: false },
      ],
      audioUrl: camiseta,
    },
    {
      syllables: ['PE', '', 'RA'],
      options: [
        { text: 'SE', isCorrect: false },
        { text: 'CE', isCorrect: true },
        { text: 'TE', isCorrect: false },
      ],
      audioUrl: pecera,
    },
    {
      syllables: ['FLO', '', 'RO'],
      options: [
        { text: 'RE', isCorrect: true },
        { text: 'ME', isCorrect: false },
        { text: 'NE', isCorrect: false },
      ],
      audioUrl: florero,
    },
    {
      syllables: ['CAMIO', '', 'TA'],
      options: [
        { text: 'ME', isCorrect: false },
        { text: 'PE', isCorrect: false },
        { text: 'NE', isCorrect: true },
      ],
      audioUrl: camioneta,
    },
    {
      syllables: ['TELÉ', '', 'NO'],
      options: [
        { text: 'MO', isCorrect: false },
        { text: 'PO', isCorrect: false },
        { text: 'FO', isCorrect: true },
      ],
      audioUrl: telefono,
    },
  ],
}

/** Level 2 - same words, different order */
export const game1Level2: Game1Level = {
  id: '2',
  title: 'Nivel 2',
  questions: [
    {
      syllables: ['FLO', '', 'RO'],
      options: [
        { text: 'RE', isCorrect: true },
        { text: 'ME', isCorrect: false },
        { text: 'NE', isCorrect: false },
      ],
      audioUrl: florero,
    },
    {
      syllables: ['CA', '', 'SE', 'TA'],
      options: [
        { text: 'MI', isCorrect: true },
        { text: 'TI', isCorrect: false },
        { text: 'NI', isCorrect: false },
      ],
      audioUrl: camiseta,
    },
    {
      syllables: ['TELÉ', '', 'NO'],
      options: [
        { text: 'MO', isCorrect: false },
        { text: 'PO', isCorrect: false },
        { text: 'FO', isCorrect: true },
      ],
      audioUrl: telefono,
    },
    {
      syllables: ['PE', '', 'RA'],
      options: [
        { text: 'SE', isCorrect: false },
        { text: 'CE', isCorrect: true },
        { text: 'TE', isCorrect: false },
      ],
      audioUrl: pecera,
    },
    {
      syllables: ['CAMIO', '', 'TA'],
      options: [
        { text: 'ME', isCorrect: false },
        { text: 'PE', isCorrect: false },
        { text: 'NE', isCorrect: true },
      ],
      audioUrl: camioneta,
    },
  ],
}

export const GAME1_LEVELS: Game1Level[] = [game1Level1, game1Level2]
