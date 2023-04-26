import { createContext } from 'react';

import { TargetCreator, TargetHitHandler } from '../../utils/types/target';
import { DifficultyModeInfo } from '../../utils/types/difficulty';

export type BoardContextType = {
  targetCreator: TargetCreator;
  hitHandler: TargetHitHandler;
  difficultyModes: DifficultyModeInfo[];
};

export const BoardContext = createContext<BoardContextType>(null);
