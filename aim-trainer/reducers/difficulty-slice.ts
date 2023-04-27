import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DifficultyLevel } from '../utils/types/difficulty';
import { DifficultyLevels } from '../utils/enums/difficulty-levels';
import { RootState } from '../../store';
import { difficultyLevelPlug } from '../utils/plugs/difficulty-level-plug';

type DifficultyState = {
  level: DifficultyLevels;
  current: DifficultyLevel;
  custom: DifficultyLevel | null;
};

const initialState: DifficultyState = {
  level: DifficultyLevels.Normal,
  current: difficultyLevelPlug,
  custom: null,
};

const difficultySlice = createSlice({
  name: 'aim_difficulty',
  initialState,
  reducers: {
    setGameDifficulty: (state, { payload }: PayloadAction<DifficultyLevels>) => {
      state.level = payload;
    },
    setCustomDifficulty: (state, { payload }: PayloadAction<DifficultyLevel>) => {
      state.custom = payload;
    },
    setCurrentDifficulty: (state, { payload }: PayloadAction<DifficultyLevel>) => {
      state.current = payload;
    },
  },
});

export const { setGameDifficulty, setCustomDifficulty, setCurrentDifficulty } =
  difficultySlice.actions;

export const selectGameDifficulty = (state: RootState) => state.aimTrainer.difficulty.level;
export const selectCustomGameDifficulty = (state: RootState) => state.aimTrainer.difficulty.custom;
export const selectCurrentGameDifficulty = (state: RootState) =>
  state.aimTrainer.difficulty.current;

export const difficultReducer = difficultySlice.reducer;
