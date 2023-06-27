import dayjs, { Dayjs } from 'dayjs';

export function getCurrenDayClass(day: Dayjs) {
  return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'current-day' : '';
}
