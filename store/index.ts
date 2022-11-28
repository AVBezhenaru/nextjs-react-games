import { configureStore } from '@reduxjs/toolkit';

import hangmanReducer from '../hangman/store/HangmanSlice';
import checkersReducer from '../checkers/store/checkersReducer';
import tetrisSlice from '../tetris2/store/tetrisSlice';

import user from './userSlice';

export const store = configureStore({
  reducer: {
    user,
    hangman: hangmanReducer,
    checkers: checkersReducer,
    tetris: tetrisSlice,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;