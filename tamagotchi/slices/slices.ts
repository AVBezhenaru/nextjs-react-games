import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

type TamagotchiState = {
  health: number;
  points: number;
  ready: boolean;
  askArr: string[];
  timer: number | 'time';
};

export const initialTime = (points: number, ready: boolean) => {
  if (ready) {
    if (points < 300 && points >= 0) return 30;
    if (points >= 300 && points < 900) return 60;
    if (points >= 900 && points < 1500) return 100;
  }
  return 'time';
};

const initialState: TamagotchiState = {
  health: 1,
  points: 1450,
  ready: false,
  askArr: [],
  timer: 'time',
};

export const tamagotchiSlice = createSlice({
  name: 'tamagotchi',
  initialState,
  reducers: {
    setHealth: (state) => {
      const oldValue = state.health;
      const newValue = oldValue > 0 ? oldValue : (state.points = -1);
      state.health = newValue;
    },
    setPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
    setReady: (state, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
      state.timer = initialTime(state.points, action.payload);
    },
    setAskArr: (state, action: PayloadAction<string[]>) => {
      state.askArr = action.payload;
    },
    reset: (state) => {
      state.health = 5;
      if (state.points >= 1500) state.points = 0;
      else state.points = -50;
      state.ready = false;
      state.askArr = [];
    },
    setTimer: (state) => {
      if (typeof state.timer === 'number') {
        const oldValue = state.timer;
        if (oldValue <= 0) {
          state.health -= 1;
          state.ready = false;
          state.askArr = [];
          state.points -= 50;
        }
        const newValue = oldValue - 1;
        state.timer = newValue;
      }
    },
  },
});

export const { setHealth, setPoints, reset, setReady, setAskArr, setTimer } =
  tamagotchiSlice.actions;

export const selectHealth = (state: RootState) => state.tamagotchi.health;
export const selectPoints = (state: RootState) => state.tamagotchi.points;
export const ready = (state: RootState) => state.tamagotchi.ready;
export const selectAskArr = (state: RootState) => state.tamagotchi.askArr;
export const selectTimer = (state: RootState) => state.tamagotchi.timer;

const articleReducer = tamagotchiSlice.reducer;
export default articleReducer;
