import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store/index';

import { IinitialState, TsettingsValue } from './typeSapperSlice';

const initialState: IinitialState = {
  settingsModal: false,
  gameIndicator: 'New game',
  gameModal: false,
  bombCount: 0,
  timerIndicator: false,
  finishTime: 0,
  settingsValue: {
    level: 'Beginner: field 9x9 cells, 10 mins',
    width: 9,
    height: 9,
    mins: 10,
  },
};

export const getSapperState = (state: RootState) => state.sapper;

const sapper = createSlice({
  name: 'sapper',
  initialState,
  reducers: {
    setSettingsModalFalse(state) {
      state.settingsModal = false;
    },
    setSettingsModal(state) {
      state.settingsModal = !state.settingsModal;
    },
    setGameModal(state) {
      state.gameModal = !state.gameModal;
    },
    setGameModalFalse(state) {
      state.gameModal = false;
    },
    setGameIndicator(state, { payload }: PayloadAction<string>) {
      state.gameIndicator = payload;
    },
    setBombCount(state, { payload }: PayloadAction<number>) {
      state.bombCount = payload;
    },
    setTimerIndicator(state, { payload }: PayloadAction<boolean>) {
      state.timerIndicator = payload;
    },
    setFinishTime(state, { payload }: PayloadAction<number>) {
      state.finishTime = payload;
    },
    setSettingsValue(state, { payload }: PayloadAction<TsettingsValue>) {
      switch (payload.level) {
        case 'Beginner: field 9x9 cells, 10 mins':
          state.settingsValue = {
            level: 'Beginner: field 9x9 cells, 10 mins',
            width: 9,
            height: 9,
            mins: 10,
          };
          break;
        case 'Intermediate: field 16x16 cells, 40 mins':
          state.settingsValue = {
            level: 'Intermediate: field 16x16 cells, 40 mins',
            width: 16,
            height: 16,
            mins: 40,
          };
          break;
        case 'Expert: field 16x30 cells, 99 mins':
          state.settingsValue = {
            level: 'Expert: field 16x30 cells, 99 mins',
            width: 30,
            height: 16,
            mins: 99,
          };
          break;
        case 'Special:':
          state.settingsValue = { ...payload };
          break;
        default:
          state.settingsValue = {
            level: 'Beginner: field 9x9 cells, 10 mins',
            width: 9,
            height: 9,
            mins: 10,
          };
      }
    },
  },
});

export const {
  setSettingsModal,
  setSettingsModalFalse,
  setSettingsValue,
  setGameIndicator,
  setGameModal,
  setGameModalFalse,
  setBombCount,
  setTimerIndicator,
  setFinishTime,
} = sapper.actions;

export default sapper.reducer;
