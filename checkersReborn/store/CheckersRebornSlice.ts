import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../models/Player";

interface ICheckersState {
  turnBy: Player | null;
}

const initialState: ICheckersState = {
  turnBy: null,
}

// initialized for online game
const checkersReborn = createSlice({
  name: 'checkersReborn',
  initialState,
  reducers: {
    setTurn(state) {

    }
  }
})

export const {
  setTurn
} = checkersReborn.actions;

export default checkersReborn.reducer;
