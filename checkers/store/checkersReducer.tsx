import { createSlice } from '@reduxjs/toolkit';

interface Checker {
  isPlayWithBoot: boolean;
  idForPlayersOnline: number;
  modal: boolean;
  color: string;
  bid: number;
  showFirst: boolean;
  show: boolean;
  isCreatedPlay: boolean;
}
const initialState: Checker = {
  isPlayWithBoot: false,
  idForPlayersOnline: -1,
  modal: false,
  color: '',
  bid: 0,
  showFirst: true,
  show: false,
  isCreatedPlay: false,
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
    setBid(state, action) {
      state.bid = action.payload;
    },
    setShow(state, action) {
      state.show = action.payload;
    },
    setShowFirst(state, action) {
      state.showFirst = action.payload;
    },
    setIsCreatedPlay(state, action) {
      state.isCreatedPlay = action.payload;
    },
  },
});

export const {
  setPlayWithBoot,
  setUserSelectedId,
  setModal,
  setColor,
  setBid,
  setShow,
  setShowFirst,
  setIsCreatedPlay,
} = checkers.actions;

export default checkers.reducer;
