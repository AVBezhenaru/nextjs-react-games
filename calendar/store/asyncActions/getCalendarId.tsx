import { createAsyncThunk } from '@reduxjs/toolkit';

import { Calendar } from '../../types/calendar';

import { getCalendarEvents } from './getCalendarEvents';

export const getCalendarId = createAsyncThunk(
  'calendar/getCalendarId',
  async (token: string, { dispatch }) => {
    const response = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    let calendarId = '';
    if (res.items) {
      res.items.forEach((calendar: Calendar) => {
        if (calendar.summary === 'CalendarAdmin') calendarId = calendar.id;
      });
      dispatch(getCalendarEvents({ token, calendarId }));
    }
    return calendarId;
  },
);
