import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { TargetConfiguration, TargetType } from '../utils/types/target';

type TargetsState = {
  targets: TargetType[];
};

const getTargetObj: (config: TargetConfiguration) => TargetType = (config) => {
  return {
    id: nanoid(),
    ...config,
  };
};

const initialState: TargetsState = {
  targets: [],
};

const targetsSlice = createSlice({
  name: 'aim_targets',
  initialState,
  reducers: {
    addTarget: (state, action: PayloadAction<TargetConfiguration>) => {
      state.targets.push(getTargetObj(action.payload));
    },
    removeTarget: (state, action: PayloadAction<string>) => {
      state.targets = state.targets.filter((target) => target.id !== action.payload);
    },
    clearTargets: (state) => {
      state.targets = [];
    },
  },
});

export const { addTarget, removeTarget, clearTargets } = targetsSlice.actions;

export const selectTargets = (state: RootState) => state.aimTrainer.targets.targets;

export const targetsReducer = targetsSlice.reducer;
