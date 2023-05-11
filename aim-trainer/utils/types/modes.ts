import { ReactNode } from 'react';

import { GameModesPaths } from '../enums/game-modes-paths';

export type GameModeData = {
  path: GameModesPaths;
  component: ReactNode;
  label: string;
  img: string;
};

export type ModeInfoObject = {
  label: string;
  value: string | number;
};
