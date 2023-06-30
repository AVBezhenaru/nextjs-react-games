import { useAppSelector } from '../../../hooks';

import st from './EventAnimation.module.scss';

export const EventAnimation = () => {
  const content = useAppSelector((state) => state.calendar.calendarReducer.animationText);

  return (
    <div className={st.animation}>
      <span className={st['animation-text']}>{content}</span>
    </div>
  );
};
