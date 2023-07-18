import { createAsyncThunk } from '@reduxjs/toolkit';

import { changeAnimationState } from '../slices/calendarSlice';

import { getCalendarEvents } from './getCalendarEvents';

interface IDeleteCalendarEventProps {
  token: string;
  calendarId: string;
  eventId: string;
}

export const deleteCalendarEvent = createAsyncThunk(
  'calendar/deleteCalendarEvent',
  async ({ token, calendarId, eventId }: IDeleteCalendarEventProps, { dispatch }) => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    try {
      const res = await response.json();
      dispatch(changeAnimationState(`Error: ${res.error.message}`));
      setTimeout(() => {
        dispatch(changeAnimationState(`Error: ${res.error.message}`));
      }, 3000);
    } catch (error) {
      dispatch(getCalendarEvents({ token, calendarId }));
      dispatch(changeAnimationState('Successful deleting'));
      setTimeout(() => {
        dispatch(changeAnimationState('Successful deleting'));
      }, 3000);
    }
  },
);
