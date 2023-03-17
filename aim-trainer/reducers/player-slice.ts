import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { PlayerPosition } from '../types/player';

type PlayerStore = {
  position: PlayerPosition;
};

const initialState: PlayerStore = {
  position: {
    x: 0,
    y: 0,
  },
};

const playerSlice = createSlice({
  name: 'wk_player',
  initialState,
  reducers: {
    setPlayerPosition: (state, action: PayloadAction<PlayerPosition>) => {
      state.position = action.payload;
    },
  },
});

export const { setPlayerPosition } = playerSlice.actions;

export const selectPlayerPosition = (state: RootState) => state.wallKickers.player.position;

export const playerReducer = playerSlice.reducer;
