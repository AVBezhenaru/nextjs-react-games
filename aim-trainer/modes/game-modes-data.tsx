import { GameModeData } from '../utils/types/modes';
import challengeImg from '../images/challenge.svg';

import { Challenge } from './challenge/challenge';

export const gameModesData: GameModeData[] = [
  { path: 'challenge', component: <Challenge />, label: 'Challenge', img: challengeImg.src },
  { path: 'challenge', component: <Challenge />, label: 'Challenge', img: challengeImg.src },
  { path: 'challenge', component: <Challenge />, label: 'Challenge', img: challengeImg.src },
  { path: 'challenge', component: <Challenge />, label: 'Challenge', img: challengeImg.src },
  // { path: 'doubleshot', component: <>some text</>, label: 'Doubleshot', img: challengeImg.src },
];
