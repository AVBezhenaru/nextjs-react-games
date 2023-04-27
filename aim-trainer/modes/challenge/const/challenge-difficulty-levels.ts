import { DifficultyLevel } from '../../../utils/types/difficulty';

export const normalChallengeDifficulty: DifficultyLevel = {
  lifetime: 9000,
  lives: 3,
  targetSize: 60,
  defaultSpeed: 2,
  speedIncrementPerSecond: 0.01,
  maxTargetCount: 9,
};

export const easyChallengeDifficulty: DifficultyLevel = {
  lifetime: 11000,
  lives: 5,
  targetSize: 70,
  defaultSpeed: 2,
  speedIncrementPerSecond: 0.01,
  maxTargetCount: 7,
};

export const hardChallengeDifficulty: DifficultyLevel = {
  lifetime: 7000,
  lives: 3,
  targetSize: 50,
  defaultSpeed: 3,
  speedIncrementPerSecond: 0.02,
  maxTargetCount: 11,
};
