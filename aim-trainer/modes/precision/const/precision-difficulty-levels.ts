import { DifficultyLevel, DifficultyModeInfo } from '../../../utils/types/difficulty';
import { DifficultyLevels } from '../../../utils/enums/difficulty-levels';

export const CHALLENGE_DIFFICULTY_MODES_INFO: DifficultyModeInfo[] = [
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

export const normalPrecisionDifficulty: DifficultyLevel = {
  lifetime: 7000,
  lives: 3,
  targetSize: 20,
  defaultSpeed: 1.5,
  speedIncrementPerSecond: 0,
  maxTargetCount: 10,
};

export const easyPrecisionDifficulty: DifficultyLevel = {
  lifetime: 7000,
  lives: 5,
  targetSize: 30,
  defaultSpeed: 1,
  speedIncrementPerSecond: 0,
  maxTargetCount: 8,
};

export const hardPrecisionDifficulty: DifficultyLevel = {
  lifetime: 7000,
  lives: 3,
  targetSize: 10,
  defaultSpeed: 2,
  speedIncrementPerSecond: 0,
  maxTargetCount: 12,
};
