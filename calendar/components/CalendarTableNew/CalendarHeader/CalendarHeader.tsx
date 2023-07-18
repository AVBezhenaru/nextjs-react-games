import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setMonthIndex, changeVisibilityCalendar } from '../../../store/slices/calendarTableSlice';

import st from './CalendarHeader.module.scss';

export const CalendarHeader = () => {
  const dispatch = useAppDispatch();
  const { monthIndex, isCalendarHidden } = useAppSelector(
    (state) => state.calendar.calendarTableReducer,
  );

  const handlePrevMonth = () => {
    dispatch(setMonthIndex(monthIndex - 1));
  };

  const handleNextMonth = () => {
    dispatch(setMonthIndex(monthIndex + 1));
  };

  const handleReset = () => {
    dispatch(setMonthIndex(dayjs().month()));
  };

  const onHiddenButtonClick = () => {
    dispatch(changeVisibilityCalendar(!isCalendarHidden));
  };

  return (
    //  <div className={st['header-wrapper']}>
    <div className={st.header}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <h2 className={st.button} onClick={onHiddenButtonClick}>
        {isCalendarHidden ? 'Hide calendar' : 'Show calendar'}
      </h2>
      {isCalendarHidden && (
        <div className={st.header}>
          <button type="button" className={st.button} onClick={handleReset}>
            Today
          </button>
          <div className={st.switch}>
            <button type="button" onClick={handlePrevMonth}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button type="button" onClick={handleNextMonth}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <h2 className={st.title}>
            {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
          </h2>
        </div>
      )}
    </div>
  );
};
