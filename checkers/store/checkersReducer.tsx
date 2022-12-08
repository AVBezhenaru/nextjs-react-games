import { createSlice } from '@reduxjs/toolkit';

import { players, player } from '../components/Lobbi/PlayersForOnlinePlay';
import { UserProps, PlayerProps } from '../interfaces/Interfaces';

interface Checker {
  isPlayWithBoot: boolean;
  idForPlayersOnline: number;
  modal: boolean;
  color: string;
  bid: number;
  showFirst: boolean;
  show: boolean;
  isCreatedPlay: boolean;
  listPlayers: UserProps[];
  playerForgameMe: PlayerProps;
}
const initialState: Checker = {
  isPlayWithBoot: false,
  idForPlayersOnline: -1,
  modal: false,
  color: 'black',
  bid: 0,
  showFirst: true,
  show: false,
  isCreatedPlay: false,
  listPlayers: players,
  playerForgameMe: player,
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
