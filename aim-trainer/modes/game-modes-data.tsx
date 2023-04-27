import { GameModeData } from '../utils/types/modes';
import challengeImg from '../images/challenge.svg';
import precisionImg from '../images/precision.svg';

import { Challenge } from './challenge/challenge';
import { Precision } from './precision/precision';

export const gameModesData: GameModeData[] = [
  { path: 'challenge', component: <Challenge />, label: 'Challenge', img: challengeImg.src },
  { path: 'precision', component: <Precision />, label: 'Precision', img: precisionImg.src },
];
