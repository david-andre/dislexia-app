import type { Game1Level } from './types'


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
      audioKey: 'camiseta',
    },
    {
      syllables: ['PE', '', 'RA'],
      options: [
        { text: 'SE', isCorrect: false },
        { text: 'CE', isCorrect: true },
        { text: 'TE', isCorrect: false },
      ],
      audioKey: 'pecera',
    },
    {
      syllables: ['FLO', '', 'RO'],
      options: [
        { text: 'RE', isCorrect: true },
        { text: 'ME', isCorrect: false },
        { text: 'NE', isCorrect: false },
      ],
      audioKey: 'florero',
    },
    {
      syllables: ['CAMIO', '', 'TA'],
      options: [
        { text: 'ME', isCorrect: false },
        { text: 'PE', isCorrect: false },
        { text: 'NE', isCorrect: true },
      ],
      audioKey: 'camioneta',
    },
    {
      syllables: ['TELÉ', '', 'NO'],
      options: [
        { text: 'MO', isCorrect: false },
        { text: 'PO', isCorrect: false },
        { text: 'FO', isCorrect: true },
      ],
      audioKey: 'telefono',
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
      audioKey: 'florero',
    },
    {
      syllables: ['CA', '', 'SE', 'TA'],
      options: [
        { text: 'MI', isCorrect: true },
        { text: 'TI', isCorrect: false },
        { text: 'NI', isCorrect: false },
      ],
      audioKey: 'camiseta',
    },
    {
      syllables: ['TELÉ', '', 'NO'],
      options: [
        { text: 'MO', isCorrect: false },
        { text: 'PO', isCorrect: false },
        { text: 'FO', isCorrect: true },
      ],
      audioKey: 'telefono',
    },
    {
      syllables: ['PE', '', 'RA'],
      options: [
        { text: 'SE', isCorrect: false },
        { text: 'CE', isCorrect: true },
        { text: 'TE', isCorrect: false },
      ],
      audioKey: 'pecera',
    },
    {
      syllables: ['CAMIO', '', 'TA'],
      options: [
        { text: 'ME', isCorrect: false },
        { text: 'PE', isCorrect: false },
        { text: 'NE', isCorrect: true },
      ],
      audioKey: 'camioneta',
    },
  ],
}

export const GAME1_LEVELS: Game1Level[] = [game1Level1, game1Level2]
