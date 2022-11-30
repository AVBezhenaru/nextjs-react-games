import { createSlice } from '@reduxjs/toolkit';

interface Checker {
  isPlayWithBoot: boolean;
  idForPlayersOnline: number;
  modal: boolean;
  color: string;
}
const initialState: Checker = {
  isPlayWithBoot: false,
  idForPlayersOnline: -1,
  modal: false,
  color: '',
};
export const checkers = createSlice({
  name: 'checkers',
  initialState,
  reducers: {
    setPlayWithBoot(state, action) {
      state.isPlayWithBoot = action.payload;
    },
    setUserSelectedId(state, action) {
      state.idForPlayersOnline = action.payload;
    },
    setModal(state, action) {
      state.modal = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
  },
});

export const { setPlayWithBoot, setUserSelectedId, setModal, setColor } = checkers.actions;

export default checkers.reducer;
