import dayjs from 'dayjs';
import { useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteCalendarEvent } from '../../store/asyncActions/deleteCalendarEvent';

import st from './Evet.module.scss';

interface EventProps {
  description: string;
  summary: string;
  startDate: string;
  endDate: string;
  eventId: string;
}

export const Event = ({ description, summary, startDate, endDate, eventId }: EventProps) => {
  const dispatch = useAppDispatch();
  const calendarId = useAppSelector((state) => state.calendar.calendarReducer.calendarId);

  const session = useSession();

  let name: string;
  if (!summary) name = 'No name';
  else if (summary.length > 40) name = `${summary.slice(0, 40)}...`;
  else name = summary;

  let text: string;
  if (!description) text = 'No description';
  else if (description.length > 80) text = `${description.slice(0, 80)}...`;
  else text = description;

  const [eventName, setEventName] = useState(name);
  const [eventDescription, setEventDescription] = useState(text);

  const onNameClick = (propName: string) => {
    setEventName((prevN: string) => (prevN.length <= 43 ? propName : `${prevN.slice(0, 40)}...`));
  };

  const onDescriptionClick = (propDescription: string) => {
    setEventDescription((prevD: string) =>
      prevD.length <= 83 ? propDescription : `${prevD.slice(0, 80)}...`,
    );
  };

  return (
    <li className={st.item}>
      <span className={st['span-text']} onClick={() => onNameClick(summary)}>
        Name: <span style={{ color: 'white' }}>{eventName}</span>
      </span>

      <span className={st['span-text']} onClick={() => onDescriptionClick(description)}>
        Description: <span style={{ color: 'white' }}>{eventDescription}</span>
      </span>
      <div className={st.start}>
        <span className={st['span-text']}>Start: </span>
        {dayjs(startDate).format('MM/DD/YYYY hh:mm A')}
      </div>
      <div>
        <span className={st['span-text']}>End: </span>
        {dayjs(endDate).format('MM/DD/YYYY hh:mm A')}
      </div>
      <button
        type="button"
        className={st.delete}
        onClick={() =>
          dispatch(
            deleteCalendarEvent({
              token: session.provider_token,
              calendarId,
              eventId,
            }),
          )
        }
      >
        Delete this event
      </button>
    </li>
  );
};
