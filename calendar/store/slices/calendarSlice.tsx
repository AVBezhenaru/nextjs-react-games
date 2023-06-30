import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Event } from '../../types/event';
import { getCalendarEvents } from '../asyncActions/getCalendarEvents';
import { getCalendarId } from '../asyncActions/getCalendarId';
import { createCalendarEvent } from '../asyncActions/createCalendarEvent';
import { deleteCalendarEvent } from '../asyncActions/deleteCalendarEvent';
// import { doRefreshToken } from '../asyncActions/doRefreshToken';

type CalendarSlice = {
  status: 'idle' | 'loading' | 'finished' | 'error';
  eventList: Event[];
  calendarId: string;
  accessToken: string;
  refreshToken: string;
  providerRefreshToken: string;
  animationVisibility: boolean;
  animationText: string;
};

const initialState: CalendarSlice = {
  status: 'idle',
  eventList: [],
  calendarId: '',
  accessToken: '',
  refreshToken: '',
  providerRefreshToken: '',
  animationVisibility: false,
  animationText: '',
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeAnimationState(state, action: PayloadAction<string>) {
      state.animationVisibility = !state.animationVisibility;
      state.animationText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCalendarEvents.fulfilled, (state, action) => {
      state.eventList = action.payload.items?.reverse();
    });
    builder.addCase(getCalendarId.fulfilled, (state, action) => {
      state.calendarId = action.payload;
    });
    builder.addCase(getCalendarEvents.rejected, (state, action) => {
      console.log('getCalendarEvents is rejected', action);
    });
    builder.addCase(getCalendarId.rejected, (state, action) => {
      console.log('getCalendarId is rejected', action);
    });
    builder.addCase(createCalendarEvent.rejected, (state, action) => {
      console.log('createCalendarEvent is rejected', action);
    });
    builder.addCase(deleteCalendarEvent.rejected, (state, action) => {
      console.log('deleteCalendarEvent is rejected', action);
    });
  },
});

export const { changeAnimationState } = calendarSlice.actions;
export default calendarSlice.reducer;
