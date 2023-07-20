import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import animationSlice from './animationSlice';
import wordleSlice from './wordleSlice';

export const store = configureStore({
  reducer: {
    wordleSlice,
    animationSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
