import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setEventName, setEventDescription } from '../../store/slices/changeEventDetailsSlice';

import st from './CalendarInputFields.module.scss';

export const CalendarInputFields = () => {
  const dispatch = useAppDispatch();

  const { eventName, eventDescription } = useAppSelector(
    (state) => state.calendar.changeEventDetailsReducer,
  );

  return (
    <>
      <div className={st.row}>
        <span className={st['span-info']}>Event name</span>
        <input
          type="text"
          placeholder="Name"
          value={eventName}
          onChange={(e) => dispatch(setEventName(e.target.value))}
          className={st['input-fields']}
        />
      </div>
      <div className={st.row}>
        <span className={st['span-info']}>Event description</span>
        <textarea
          placeholder="Description"
          value={eventDescription}
          onChange={(e) => dispatch(setEventDescription(e.target.value))}
          className={st.textarea}
        />
      </div>
    </>
  );
};
