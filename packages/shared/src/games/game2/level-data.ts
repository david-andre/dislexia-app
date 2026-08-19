import type { Game2Level } from './types'


export const game2Level1: Game2Level = {
  id: '1',
  title: 'Nivel 1',
  questions: [
    {
      syllables: ['MI', 'SE', 'TA', 'CA'],
      correctOrder: ['CA', 'MI', 'SE', 'TA'],
      audioKey: 'camiseta',
    },
    {
      syllables: ['PE', 'CE', 'RA'],
      correctOrder: ['PE', 'CE', 'RA'],
      audioKey: 'pecera',
    },
    {
      syllables: ['RO', 'RE', 'FLO'],
      correctOrder: ['FLO', 'RE', 'RO'],
      audioKey: 'florero',
    },
    {
      syllables: ['CA', 'TA', 'NE', 'MIO'],
      correctOrder: ['CA', 'MIO', 'NE', 'TA'],
      audioKey: 'camioneta',
    },
    {
      syllables: ['FO', 'LÉ', 'TE', 'NO'],
      correctOrder: ['TE', 'LÉ', 'FO', 'NO'],
      audioKey: 'telefono',
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
      audioKey: 'florero',
    },
    {
      syllables: ['TA', 'CA', 'MI', 'SE'],
      correctOrder: ['CA', 'MI', 'SE', 'TA'],
      audioKey: 'camiseta',
    },
    {
      syllables: ['MIO', 'NE', 'TA', 'CA'],
      correctOrder: ['CA', 'MIO', 'NE', 'TA'],
      audioKey: 'camioneta',
    },
    {
      syllables: ['NO', 'FO', 'LÉ', 'TE'],
      correctOrder: ['TE', 'LÉ', 'FO', 'NO'],
      audioKey: 'telefono',
    },
    {
      syllables: ['RA', 'PE', 'CE'],
      correctOrder: ['PE', 'CE', 'RA'],
      audioKey: 'pecera',
    },
  ],
}

export const GAME2_LEVELS: Game2Level[] = [game2Level1, game2Level2]
