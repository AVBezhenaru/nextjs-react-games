import { DifficultyLevels } from '../enums/difficulty-levels';

export type DifficultyLevel = {
  lifetime?: number;
  lives: number;
  targetSize?: number;
  defaultSpeed: number;
  speedIncrementPerSecond: number;
  maxTargetCount: number;
};

export type DifficultyModeInfoOnSelect = (type: DifficultyLevels) => void;

export type DifficultyModeInfo = {
  type: DifficultyLevels;
  label: string;
  onSelect?: DifficultyModeInfoOnSelect;
};
