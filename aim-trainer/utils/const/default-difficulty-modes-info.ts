import { DifficultyModeInfo } from '../types/difficulty';
import { DifficultyLevels } from '../enums/difficulty-levels';

export const DEFAULT_DIFFICULTY_MODES_INFO: DifficultyModeInfo[] = [
  {
    label: 'Easy',
    type: DifficultyLevels.Easy,
  },
  {
    label: 'Normal',
    type: DifficultyLevels.Normal,
  },
  {
    label: 'Hard',
    type: DifficultyLevels.Hard,
  },
  {
    label: 'Custom',
    type: DifficultyLevels.Custom,
  },
];
