import { useSession } from '@supabase/auth-helpers-react';

import { createCalendarEvent } from '../../store/asyncActions/createCalendarEvent';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import st from './CreateEventButton.module.scss';

export const CreateEventButton = () => {
  const session = useSession();

  const calendarId = useAppSelector((state) => state.calendar.calendarReducer.calendarId);

  const dispatch = useAppDispatch();

  const { eventStartDate, eventEndDate, eventName, eventDescription } = useAppSelector(
    (state) => state.calendar.changeEventDetailsReducer,
  );

  return (
    <button
      type="button"
      onClick={() =>
        dispatch(
          createCalendarEvent({
            token: session.provider_token,
            calendarId,
            eventStartDate,
            eventEndDate,
            eventDescription,
            eventName,
          }),
        )
      }
      className={st.buttons}
    >
      Create event in Google Calendar
    </button>
  );
};
