import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { getCurrenDayClass } from '../../../utils/getCurrenDayClass';
import { useAppSelector } from '../../../../hooks';
import { Event } from '../../../types/event';
import { DayEvent } from '../DayEvent/DayEvent';

import st from './Day.module.scss';

interface DayProps {
  day: Dayjs;
  rowIndx: number;
}

export const Day = ({ day, rowIndx }: DayProps) => {
  const classes = getCurrenDayClass(day);
  const items = useAppSelector((state) => state.calendar.calendarReducer.eventList);

  return (
    <div className={`${st.day} ${classes ? st[classes] : ''}`}>
      {rowIndx === 0 && <div className={st['week-day']}>{day.format('ddd').toUpperCase()}</div>}
      <div>{day.format('DD')}</div>
      <div className={st.events}>
        {items.map((event: Event) => {
          let res: React.ReactNode;
          if (dayjs(event.start.dateTime).format('MM-DD-YY') === day.format('MM-DD-YY')) {
            res = (
              <DayEvent
                description={event.description}
                summary={event.summary}
                startDate={event.start.dateTime}
                endDate={event.end.dateTime}
                key={event.id}
                eventId={event.id}
              />
            );
          }
          return res;
        })}
      </div>
    </div>
  );
};
