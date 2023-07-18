import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createSlice } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

const initialState = {
  eventStartDate: dayjs(new Date()),
  eventEndDate: dayjs(new Date()),
  eventName: '',
  eventDescription: '',
};

export const changeEventDetailsSlice = createSlice({
  name: 'timePickers',
  initialState,
  reducers: {
    setEventStartDate(state, action: PayloadAction<Dayjs>) {
      state.eventStartDate = dayjs(action.payload);
    },
    setEventEndDate(state, action: PayloadAction<Dayjs>) {
      state.eventEndDate = dayjs(action.payload);
    },
    setEventName(state, action: PayloadAction<string>) {
      state.eventName = action.payload;
    },
    setEventDescription(state, action: PayloadAction<string>) {
      state.eventDescription = action.payload;
    },
    clearFieldsAfterCreate(state) {
      state.eventDescription = '';
      state.eventName = '';
      state.eventStartDate = dayjs(new Date());
      state.eventEndDate = dayjs(new Date());
    },
  },
});

export const {
  setEventStartDate,
  setEventEndDate,
  setEventDescription,
  setEventName,
  clearFieldsAfterCreate,
} = changeEventDetailsSlice.actions;
export default changeEventDetailsSlice.reducer;
