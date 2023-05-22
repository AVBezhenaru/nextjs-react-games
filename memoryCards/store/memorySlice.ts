import { createSlice } from '@reduxjs/toolkit';

type Theme = {
  theme: string;
};

const initialState: Theme = {
  theme: 'nature',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
