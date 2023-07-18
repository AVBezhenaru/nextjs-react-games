import React from 'react';
import { Dayjs } from 'dayjs';

import { Day } from '../Day/Day';
import { useAppSelector } from '../../../../hooks';
import { getMonth } from '../../../utils/getMouth';

import st from './Months.module.scss';

export const Months = () => {
  const { monthIndex, isCalendarHidden } = useAppSelector(
    (state) => state.calendar.calendarTableReducer,
  );

  return (
    isCalendarHidden && (
      <div className={st.months}>
        {getMonth(monthIndex).map((row: Dayjs[], i: number) => (
          <React.Fragment key={i}>
            {row.map((day: Dayjs, indx: number) => (
              <Day day={day} key={indx} rowIndx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    )
  );
};
