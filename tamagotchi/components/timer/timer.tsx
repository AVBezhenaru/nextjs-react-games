import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTimer, selectTimer, ready } from '../../slices/slices';

const Timer = (points: number, isReady: boolean) => {
  // babyTime = 30s;
  // childTime = 60s;
  // adultTime = 100s;
  // let timer: number | 'off';

  const dispatch = useAppDispatch();
  // const isReady = useAppSelector(ready);
  const timeState = useAppSelector(selectTimer);

  const [time, setTime] = useState<number | 'time'>(timeState);
  const [intervalID, setIntervalID] = useState(0);
  // const [readyState, setReadyState] = useState<boolean>(isReady);
  // // const transformedTime = transformTime(time);

  useEffect(() => {
    if (isReady && points < 300) setTime(30);
    if (isReady && points >= 300 && points < 900) setTime(60);
    if (isReady && points >= 900 && points < 1500) setTime(100);
  }, []);

  const onStartTimer = () => {
    const interval = window.setInterval(() => {
      if (typeof time === 'number') setTime(time - 1);
      dispatch(setTimer());
    }, 1000);
    setIntervalID(interval);

    if (time === 0 || !isReady) {
      clearInterval(intervalID);
      console.log('00000000000000');
    }
    return time;
  };

  const transformTime = (time: number | 'time') => {
    console.log('timerrr', time);
    if (typeof time === 'number' && isReady) {
      const min = `${Math.trunc(time / 60)}`.padStart(2, '0');
      const sec = `${time - Number(min) * 60}`.padStart(2, '0');
      return `${min}:${sec}`;
    }
    return 'time';
  };

  useEffect(() => {
    if (isReady) onStartTimer();
    if (!isReady) clearInterval(intervalID);
  }, [isReady]);

  return <>{transformTime(timeState)}</>;
};

export default Timer;
