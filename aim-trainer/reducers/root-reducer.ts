import { combineReducers } from 'redux';

import { scoreReducer } from './score-slice';
import { playerReducer } from './player-slice';

export const wallKickerRootReducer = combineReducers({
  score: scoreReducer,
  player: playerReducer,
});
