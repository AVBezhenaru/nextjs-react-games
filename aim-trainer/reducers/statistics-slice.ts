import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatItem } from '../utils/types/statistics';
import { RootState } from '../../store';
import { msToMinString } from '../utils/lib/ms-to-min-string';

type StatisticsState = {
  statItems: StatItem[];
  score: number;
  misses: number;
  speed: number;
  timeFromStart: number;
};

const initialState: StatisticsState = {
  statItems: [],
  score: 0,
  misses: 0,
  speed: 2,
  timeFromStart: 0,
};

export const statisticsSlice = createSlice({
  name: 'aim_stat',
  initialState,
  reducers: {
    setStatItems: (state, { payload }: PayloadAction<StatItem[]>) => {
      state.statItems = payload;
    },
    addHit: (state) => {
      state.score++;
    },
    setSpeed: (state, { payload }: PayloadAction<number>) => {
      state.speed = payload;
    },
    addTimeFromStart: (state, { payload }: PayloadAction<number>) => {
      state.timeFromStart += payload;
    },
    setTimeFromStart: (state, { payload }: PayloadAction<number>) => {
      state.timeFromStart = payload;
    },
    addMiss: (state) => {
      state.misses += 1;
    },
    resetGameStat: (state) => {
      state.timeFromStart = 0;
      state.score = 0;
      state.speed = 2;
      state.misses = 0;
      state.statItems = [];
    },
  },
});

export const {
  setStatItems,
  setSpeed,
  addHit,
  addTimeFromStart,
  setTimeFromStart,
  addMiss,
  resetGameStat,
} = statisticsSlice.actions;

export const selectStatItems = (state: RootState) => state.aimTrainer.statistics.statItems;
export const selectTimeFromStart = (state: RootState) =>
  msToMinString(state.aimTrainer.statistics.timeFromStart);
export const selectGameSpeed = (state: RootState) => state.aimTrainer.statistics.speed;
export const selectScore = (state: RootState) => state.aimTrainer.statistics.score;
export const selectAccuracy = (state: RootState) => {
  const { score, misses } = state.aimTrainer.statistics;
  const sum = score + misses;
  const accuracy = ((score / sum) * 100 || 0).toFixed(2);

  return `${accuracy}%`;
};

export const statisticsReducer = statisticsSlice.reducer;
