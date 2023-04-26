import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SizeType } from '../utils/types/sizes';
import { RootState } from '../../store';
import { ModeInfoObject } from '../utils/types/modes';

type BoardState = {
  size: SizeType;
  modeInfoArray: ModeInfoObject[];
};

const initialState: BoardState = {
  size: {
    w: 0,
    h: 0,
  },
  modeInfoArray: [],
};

const boardSlice = createSlice({
  name: 'aim_board',
  initialState,
  reducers: {
    setBoardSizes: (state, { payload }: PayloadAction<SizeType>) => {
      state.size = payload;
    },
    setModeInfoArray: (state, { payload }: PayloadAction<ModeInfoObject[]>) => {
      state.modeInfoArray = payload;
    },
  },
});

export const { setBoardSizes, setModeInfoArray } = boardSlice.actions;

export const selectBoardSizes = (state: RootState) => state.aimTrainer.board.size;
export const selectModeInfo = (state: RootState) => state.aimTrainer.board.modeInfoArray;

export const boardReducer = boardSlice.reducer;
