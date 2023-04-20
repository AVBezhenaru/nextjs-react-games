import { GameModeData } from '../types/modes';

import { Challenge } from './challenge/challenge';

export const gameModesData: GameModeData[] = [
  { path: 'challenge', component: <Challenge />, label: 'Challenge' },
  { path: 'doubleshot', component: <>some text</>, label: 'Doubleshot' },
];
