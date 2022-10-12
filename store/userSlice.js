import { createSlice } from '@reduxjs/toolkit';

import { fetchLoginUser, fetchRegisterUser } from '../api/service';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    email: null,
    loading: false,
    error: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: {
    [fetchLoginUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchLoginUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.img = action.payload.user.image;
      state.loading = false;
    },
    [fetchLoginUser.rejected]: (state, action) => {
      console.log('state :', state);
      state.error = true;
      state.loading = false;
      state.errorMessage = action.payload;
    },

    [fetchRegisterUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.loading = false;
    },
    [fetchRegisterUser.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default userSlice.reducer;
