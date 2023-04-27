import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { GameStatus } from '../utils/enums/game-status';

type GameState = {
  lives: number;
  deathCounter: number;
  status: GameStatus;
};

const initialState: GameState = {
  lives: 3,
  deathCounter: 0,
  status: GameStatus.Idle,
};

const gameSlice = createSlice({
  name: 'aim_game',
  initialState,
  reducers: {
    setLives: (state, { payload }: PayloadAction<number>) => {
      state.lives = payload;
    },
    addDeath: (state) => {
      state.deathCounter++;
    },
    resetGameData: (state) => {
      state.deathCounter = 0;
    },
    setGameStatus: (state, { payload }: PayloadAction<GameStatus>) => {
      state.status = payload;
    },
  },
});

export const { setLives, addDeath, resetGameData, setGameStatus } = gameSlice.actions;

export const selectGameIsStarted = (state: RootState) =>
  state.aimTrainer.game.status === GameStatus.Start;
export const selectGameIsOver = (state: RootState) =>
  state.aimTrainer.game.status === GameStatus.Over;
export const selectGameIsPending = (state: RootState) =>
  state.aimTrainer.game.status === GameStatus.Pending;
export const selectGameIsIdle = (state: RootState) =>
  state.aimTrainer.game.status === GameStatus.Idle;
export const selectGameStatus = (state: RootState) => state.aimTrainer.game.status;

export const selectLives = (state: RootState) => state.aimTrainer.game.lives;
export const selectDeathCount = (state: RootState) => state.aimTrainer.game.deathCounter;

export const gameReducer = gameSlice.reducer;
