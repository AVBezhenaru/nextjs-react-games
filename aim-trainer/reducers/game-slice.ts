import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { GameStatus } from '../utils/enums/game-status';
import { DifficultyLevels } from '../utils/enums/difficulty-levels';

type GameState = {
  lives: number;
  deathCounter: number;
  status: GameStatus;
  difficulty: DifficultyLevels;
};

const initialState: GameState = {
  lives: 3,
  deathCounter: 0,
  status: GameStatus.Idle,
  difficulty: DifficultyLevels.Normal,
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
    setGameDifficulty: (state, { payload }: PayloadAction<DifficultyLevels>) => {
      state.difficulty = payload;
    },
  },
});

export const { setLives, addDeath, resetGameData, setGameStatus, setGameDifficulty } =
  gameSlice.actions;

export const selectGameIsStarted = (state: RootState) =>
  state.aimTrainer.game.status === GameStatus.Start;
export const selectGameIsOver = (state: RootState) =>
  state.aimTrainer.game.status === GameStatus.Over;
export const selectGameIsPending = (state: RootState) =>
  state.aimTrainer.game.status === GameStatus.Pending;
export const selectGameIsIdle = (state: RootState) =>
  state.aimTrainer.game.status === GameStatus.Idle;
export const selectGameStatus = (state: RootState) => state.aimTrainer.game.status;
export const selectGameDifficulty = (state: RootState) => state.aimTrainer.game.difficulty;

export const selectLives = (state: RootState) => state.aimTrainer.game.lives;
export const selectDeathCount = (state: RootState) => state.aimTrainer.game.deathCounter;

export const gameReducer = gameSlice.reducer;
