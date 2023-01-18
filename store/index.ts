import { configureStore } from '@reduxjs/toolkit';

import hangmanReducer from '../hangman/store/HangmanSlice';
import DataSlice from '../chess/dataSlice/DataSlice';
import { storeSolitaire } from '../solitaire/store/store';
import solitaireSlice from '../solitaireReborn/store/solitaireSlice';

import user from './userSlice';

export const store = configureStore({
  reducer: {
    user,
    hangman: hangmanReducer,
    rootSlice: DataSlice,
    solitaire: storeSolitaire,
    solitaireReborn: solitaireSlice,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
