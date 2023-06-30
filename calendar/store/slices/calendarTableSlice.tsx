import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  monthIndex: dayjs().month(),
  isCalendarHidden: false,
};

export const calendarTableSlice = createSlice({
  name: 'calendarTable',
  initialState,
  reducers: {
    setMonthIndex(state, action: PayloadAction<number>) {
      state.monthIndex = action.payload;
    },
    changeVisibilityCalendar(state, action) {
      state.isCalendarHidden = action.payload;
    },
  },
});

export const { setMonthIndex, changeVisibilityCalendar } = calendarTableSlice.actions;
export default calendarTableSlice.reducer;
