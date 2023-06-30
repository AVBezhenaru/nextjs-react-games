import { createAsyncThunk } from '@reduxjs/toolkit';

interface IGetCalendarEventsProps {
  token: string;
  calendarId: string;
}

export const getCalendarEvents = createAsyncThunk(
  'calendar/getCalendarEvents',
  async ({ token, calendarId }: IGetCalendarEventsProps) => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const res = await response.json();
    return res;
  },
);
