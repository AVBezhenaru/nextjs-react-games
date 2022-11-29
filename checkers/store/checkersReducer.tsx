import { createSlice } from '@reduxjs/toolkit';

interface Checker {
  isPlayWithBoot: boolean;
  idForPlayersOnline: number;
}
const initialState: Checker = {
  isPlayWithBoot: false,
  idForPlayersOnline: -1,
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
  },
  // extraReducers: (builder) => {},
});

export const { setPlayWithBoot, setUserSelectedId } = checkers.actions;

export default checkers.reducer;
