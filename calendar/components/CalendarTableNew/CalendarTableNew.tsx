import { Months } from './Months/Months';
import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import st from './CalendarTableNew.module.scss';

export const CalendarTableNew = () => (
  <div className={st['calendar-wrapper']}>
    <CalendarHeader />
    <Months />
  </div>
);
