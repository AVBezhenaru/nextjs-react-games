import { configureStore } from '@reduxjs/toolkit';

import hangmanReducer from '../hangman/store/HangmanSlice';

import user from './userSlice';

export const store = configureStore({
  reducer: {
    user,
    hangman: hangmanReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
