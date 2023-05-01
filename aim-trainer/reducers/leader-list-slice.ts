import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatItem } from '../utils/types/statistics';
import { RootState } from '../../store';
import { GameModesPaths } from '../utils/enums/game-modes-paths';
import { DifficultyLevels } from '../utils/enums/difficulty-levels';

export type DifficultyModeData = {
  statItems: StatItem[];
  timestamp: number;
  nickname?: string;
};

export type ModeData = {
  [key in DifficultyLevels]?: DifficultyModeData[];
};

type LeaderListState = {
  [key in GameModesPaths]?: {
    [key in 'local' | 'global']?: ModeData;
  };
};

const initialState: LeaderListState = {
  [GameModesPaths.Challenge]: {
    global: {},
    local: {},
  },
};

type SetModeDataPayload = {
  mode: GameModesPaths;
  data: DifficultyModeData[];
  difficulty: DifficultyLevels;
};

const leaderListSlice = createSlice({
  name: 'aim_leader-list',
  initialState,
  reducers: {
    setModeData: (state, { payload }: PayloadAction<SetModeDataPayload>) => {
      const { mode, data, difficulty } = payload;

      state[mode].local[difficulty] = data;
    },
  },
});

export const { setModeData } = leaderListSlice.actions;

export const selectLocalModeData = (mode: GameModesPaths) => (state: RootState) =>
  state.aimTrainer.leaderList[mode].local;
export const selectLeaderList = (state: RootState) => state.aimTrainer.leaderList;

export const leaderListReducer = leaderListSlice.reducer;
