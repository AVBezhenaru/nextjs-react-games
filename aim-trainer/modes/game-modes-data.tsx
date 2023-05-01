import { GameModeData } from '../utils/types/modes';
import challengeImg from '../images/challenge.svg';
import precisionImg from '../images/precision.svg';
import { GameModesPaths } from '../utils/enums/game-modes-paths';

import { Challenge } from './challenge/challenge';
import { Precision } from './precision/precision';

export const gameModesData: GameModeData[] = [
  {
    path: GameModesPaths.Challenge,
    component: <Challenge />,
    label: 'Challenge',
    img: challengeImg.src,
  },
  {
    path: GameModesPaths.Precision,
    component: <Precision />,
    label: 'Precision',
    img: precisionImg.src,
  },
];
