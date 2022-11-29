import { CreateStageType } from '../../types/types';

export const STAGE_WIDTH = 10;
export const STATE_HEIGHT = 20;

export const createStage = (): CreateStageType =>
  Array.from(Array(STATE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

export const createNextDetailStage = (): CreateStageType =>
  Array.from(Array(5), () => new Array(5).fill(0));
