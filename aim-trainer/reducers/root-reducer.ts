import { combineReducers } from '@reduxjs/toolkit';

import { boardReducer } from './board-slice';
import { targetsReducer } from './targets-slice';
import { gameReducer } from './game-slice';
import { statisticsReducer } from './statistics-slice';
import { difficultReducer } from './difficulty-slice';

export const aimTrainerRootReducer = combineReducers({
  board: boardReducer,
  targets: targetsReducer,
  game: gameReducer,
  statistics: statisticsReducer,
  difficulty: difficultReducer,
});
