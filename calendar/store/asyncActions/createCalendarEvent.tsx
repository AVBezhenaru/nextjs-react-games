import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';

import { clearFieldsAfterCreate } from '../slices/changeEventDetailsSlice';
import { changeAnimationState } from '../slices/calendarSlice';

import { getCalendarEvents } from './getCalendarEvents';

interface ICreateCalendarEventProps {
  token: string;
  calendarId: string;
  eventStartDate: Dayjs;
  eventEndDate: Dayjs;
  eventName: string;
  eventDescription: string;
}

export const createCalendarEvent = createAsyncThunk(
  'calendar/createCalendarEvent',
  async (
    {
      token,
      calendarId,
      eventStartDate,
      eventEndDate,
      eventName,
      eventDescription,
    }: ICreateCalendarEventProps,
    { dispatch },
  ) => {
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: eventStartDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: eventEndDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      },
    );

    const res = await response.json();
    if (!res.error) {
      dispatch(getCalendarEvents({ token, calendarId }));
      dispatch(clearFieldsAfterCreate());
      dispatch(changeAnimationState('Successful creation'));
      setTimeout(() => {
        dispatch(changeAnimationState('Successful creation'));
      }, 3000);
    } else {
      dispatch(changeAnimationState(`Error: ${res.error.message}`));
      setTimeout(() => {
        dispatch(changeAnimationState(`Error: ${res.error.message}`));
      }, 3000);
    }
    return res;
  },
);
