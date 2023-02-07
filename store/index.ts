import { configureStore } from '@reduxjs/toolkit';

import hangmanReducer from '../hangman/store/HangmanSlice';
import DataSlice from '../chess/dataSlice/DataSlice';
import solitaireSlice from '../solitaire/store/solitaireSlice';
import game2048Reducer from '../game2048/reducers';

import user from './userSlice';

export const store = configureStore({
  reducer: {
    user,
    hangman: hangmanReducer,
    rootSlice: DataSlice,
    solitaireReborn: solitaireSlice,
    game2048: game2048Reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
