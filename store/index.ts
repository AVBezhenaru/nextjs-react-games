import { configureStore } from '@reduxjs/toolkit';

import hangmanReducer from '../hangman/store/HangmanSlice';
import checkersReducer from '../checkers/store/checkersReducer';
import tetrisSlice from '../tetris2/store/tetrisSlice';
import DataSlice from '../chess/dataSlice/DataSlice';
import { storeSolitaire } from '../solitaire/store/store';
import game2048Reducer from '../game2048/reducers';

import user from './userSlice';

export const store = configureStore({
  reducer: {
    user,
    hangman: hangmanReducer,
    checkers: checkersReducer,
    tetris: tetrisSlice,
    rootSlice: DataSlice,
    solitaire: storeSolitaire,
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
