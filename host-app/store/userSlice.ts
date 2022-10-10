import { createSlice } from '@reduxjs/toolkit';
import {
    fetchLoginUser,
    fetchRegisterUser
} from "../api/service";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        email: null,
        loading: false,
        error: false,
        errorMessage: '',
    },
    reducers: {

    },
    extraReducers: {
        [fetchLoginUser.pending as any]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [fetchLoginUser.fulfilled as any]: (state, action) => {
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;
            state.loading = false;
        },
        [fetchLoginUser.rejected as any]: (state, action) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = action.payload;
        },


        [fetchRegisterUser.pending as any]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [fetchRegisterUser.fulfilled as any]: (state, action) => {
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;
            state.loading = false;
        },
        [fetchRegisterUser.rejected as any]: (state, action) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = action.payload;
        },

    },
});

export default userSlice.reducer;
