import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CellModel from "../models/CellModel";

interface ICheckersState {
  cells: CellModel[];
}

const initialState: ICheckersState = {
  cells: [],
}

const checkersReborn = createSlice({
  name: 'checkersReborn',
  initialState,
  reducers: {
    initGame(state) {

    }
  }
})

export const {
  initGame
} = checkersReborn.actions;

export default checkersReborn.reducer;
