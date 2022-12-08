import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../user/types/gamesItemTypes';

// import {fetchLoginUser, fetchRegisterUser} from '../../api/service';

export interface ReducerInitialState {
  users: User[];
}

const initialState: ReducerInitialState = {
  users: [
    {
      email: 'b@b.com',
      password: '123',
      token: '123',
      username: 'B B',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'a@a.com',
      password: '123456',
      token: '124',
      username: 'A A',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'c@c.com',
      password: '123456',
      token: '125',
      username: 'C C',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'd@d.com',
      password: '123456',
      token: '126',
      username: 'D D',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'e@e.com',
      password: '123456',
      token: '127',
      username: 'E E',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'f@f.com',
      password: '123456',
      token: '128',
      username: 'F F',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'g@g.com',
      password: '123456',
      token: '129',
      username: 'G G',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
  ],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateList(state, action: PayloadAction<User[]>) {
      state.users = state.users.concat(action.payload);
      console.log(state.users);
    },
    //
    // extraReducers: {
    //     [fetchLoginUser.pending]: (state) => {
    //         state.loading = true;
    //         state.error = false;
    //     },
    //     [fetchLoginUser.fulfilled]: (state, action) => {
    //         state.username = action.payload.user.username;
    //         state.email = action.payload.user.email;
    //         state.img = action.payload.user.image;
    //         state.loading = false;
    //     },
    //     [fetchLoginUser.rejected]: (state, action) => {
    //         console.log('state :', state);
    //         state.error = true;
    //         state.loading = false;
    //         state.errorMessage = action.payload;
    //     },
    //
    //     [fetchRegisterUser.pending]: (state) => {
    //         state.loading = true;
    //         state.error = false;
    //     },
    //     [fetchRegisterUser.fulfilled]: (state, action) => {
    //         state.username = action.payload.user.username;
    //         state.email = action.payload.user.email;
    //         state.loading = false;
    //     },
    //     [fetchRegisterUser.rejected]: (state, action) => {
    //         state.error = true;
    //         state.loading = false;
    //         state.errorMessage = action.payload;
    //     },
    //     }
  },
});

export default userSlice.reducer;
