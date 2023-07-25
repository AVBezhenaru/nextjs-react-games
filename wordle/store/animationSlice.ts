import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusedInput: 0,
  checkingLetters: false,
  editLetterBox: -1,
  animationDone: 0,
};

const animationSlice = createSlice({
  name: 'animationSlice',
  initialState,
  reducers: {
    setFocusedInput: (state, action) => {
      state.focusedInput = action.payload;
    },
    setCheckingLetters: (state, action) => {
      state.checkingLetters = action.payload;
    },
    setEditLetterBox: (state, action) => {
      state.editLetterBox = action.payload;
    },
    setAnimationDone: (state, action) => {
      state.animationDone = action.payload;
    },
  },
});

export const { setFocusedInput, setCheckingLetters, setEditLetterBox, setAnimationDone } =
  animationSlice.actions;
export default animationSlice.reducer;
