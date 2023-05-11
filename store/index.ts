import { configureStore } from '@reduxjs/toolkit';

import hangmanReducer from '../hangman/store/HangmanSlice';
import DataSlice from '../chess/dataSlice/DataSlice';
import solitaireSlice from '../solitaire/store/solitaireSlice';
import game2048Reducer from '../game2048/reducers';
import sapperReducer from '../sapper/store/sapperSlice';
import tanksGameReducer from '../tanks/reducers/tanksGameReducer';
import doodlerReducer from '../doodle-jump/reducer/doodleReducer';
import spaceshipSlice from '../two-min-in-space/store/spaceshipSlice';

import user from './userSlice';

export const store = configureStore({
  reducer: {
    user,
    hangman: hangmanReducer,
    rootSlice: DataSlice,
    solitaireReborn: solitaireSlice,
    game2048: game2048Reducer,
    sapper: sapperReducer,
    tanks: tanksGameReducer,
    doodler: doodlerReducer,
    spaceship: spaceshipSlice,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    });
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
