import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import hangmanReducer from '../hangman/store/HangmanSlice';
import DataSlice from '../chess/dataSlice/DataSlice';
import memorySlice from '../memoryCards/store/memorySlice';
import solitaireSlice from '../solitaire/store/solitaireSlice';
import game2048Reducer from '../game2048/reducers';
import { aimTrainerRootReducer } from '../aim-trainer/reducers/root-reducer';
import sapperReducer from '../sapper/store/sapperSlice';
import tanksGameReducer from '../tanks/reducers/tanksGameReducer';
import doodlerReducer from '../doodle-jump/reducer/doodleReducer';
import spaceshipSlice from '../two-min-in-space/store/spaceshipSlice';
import tamagotchiSlice from '../tamagotchi/slices/slices';
import { calendarReducers } from '../calendar/store/slices';

import user from './userSlice';

export const store = configureStore({
  reducer: {
    user,
    hangman: hangmanReducer,
    rootSlice: DataSlice,
    memoryCards: memorySlice,
    solitaireReborn: solitaireSlice,
    aimTrainer: aimTrainerRootReducer,
    game2048: game2048Reducer,
    sapper: sapperReducer,
    tanks: tanksGameReducer,
    doodler: doodlerReducer,
    spaceship: spaceshipSlice,
    tamagotchi: tamagotchiSlice,
    calendar: calendarReducers,
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

export const persistor = persistStore(store);
