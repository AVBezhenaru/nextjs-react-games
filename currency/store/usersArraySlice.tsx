import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

import { IUser, IDataChangeAmount } from '../types';

export interface ReducerInitialState {
  users: IUser[];
}

const initialState: ReducerInitialState = {
  users: [
    { name: 'Alexxx', amount: '10', id: '0' },
    { name: 'Bob', amount: '15', id: '1' },
    { name: 'Tim', amount: '1', id: '2' },
    { name: 'Gleb', amount: '10', id: '3' },
    { name: 'Sasha', amount: '13', id: '4' },
    { name: 'Tom', amount: '32', id: '5' },
    { name: 'Dan', amount: '18', id: '6' },
    { name: 'Rob', amount: '8', id: '7' },
    { name: 'Bob T', amount: '10', id: '8' },
    { name: 'Forest', amount: '14', id: '9' },
    { name: 'Vlad', amount: '12', id: '10' },
    { name: 'Bob M', amount: '4', id: '11' },
    { name: 'Alex R', amount: '14', id: '12' },
    { name: 'Gleb R', amount: '18', id: '13' },
    { name: 'Jerry', amount: '8', id: '14' },
    { name: 'Tommy', amount: '3', id: '15' },
    { name: 'Harry', amount: '7', id: '16' },
    { name: 'Ivan', amount: '14', id: '17' },
    { name: 'Nikita', amount: '17', id: '18' },
    { name: 'Mikita', amount: '2', id: '19' },
    { name: 'Anton', amount: '6', id: '20' },
    { name: 'Jason', amount: '13', id: '21' },
    { name: 'Yakov', amount: '23', id: '22' },
  ],
};

export const usersArraySlice = createSlice({
  name: 'usersArray',
  initialState,
  reducers: {
    changeAmount(state, action: PayloadAction<IDataChangeAmount>) {
      const newState = { ...current(state) };

      for (let i = 0; i < newState.users.length; i++) {
        if (newState.users[i].id === action.payload.id) {
          const newUserInfo = { ...newState.users[i] };
          newUserInfo.amount = action.payload.newAmount;
          state.users = [
            ...newState.users.slice(0, i),
            newUserInfo,
            ...newState.users.slice(i + 1, newState.users.length),
          ];
          break;
        }
      }
    },
  },
});

export const { changeAmount } = usersArraySlice.actions;

export default usersArraySlice.reducer;
