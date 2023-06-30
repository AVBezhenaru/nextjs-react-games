import { useAppSelector } from '../../../hooks';
import { Event } from '../Event/Event';
import { Event as EventType } from '../../types/event';

import st from './EventList.module.scss';

export const EventList = () => {
  const eventList = useAppSelector((state) => state.calendar.calendarReducer.eventList);
  return (
    <div className={st['right-part']}>
      <h2 className={st['part-title']}>
        {eventList
          ? eventList.length
            ? 'Event list'
            : 'Event list is empty'
          : 'Event list is empty'}
      </h2>
      <ul className={st.list}>
        {eventList && eventList.length ? (
          eventList.map((event: EventType) => (
            <Event
              description={event.description}
              summary={event.summary}
              startDate={event.start.dateTime}
              endDate={event.end.dateTime}
              key={event.id}
              eventId={event.id}
            />
          ))
        ) : (
          <h2 className={`${st['empty-title']}`}>
            You have not created any event yet. Please, create an event and it will be here
          </h2>
        )}
      </ul>
    </div>
  );
};
