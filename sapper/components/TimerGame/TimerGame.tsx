import React, { useState, useEffect } from 'react';

import { getSapperState } from '../../store/sapperSlice';
import { useAppSelector } from '../../../hooks';

import classes from './TimerGame.module.scss';

const TimerGame: React.FC = () => {
  const { timerIndicator } = useAppSelector(getSapperState);
  const [timerData, setTimerData] = useState(0);

  useEffect(() => {
    let timerId: number;
    if (timerIndicator) {
      timerId = window.setInterval(() => {
        setTimerData((timerDataNow) => timerDataNow + 1);
      }, 1000);
    } else {
      setTimerData(0);
    }

    return () => {
      window.clearInterval(timerId);
    };
  }, [timerIndicator, setTimerData]);

  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>TIME</p>
      <p className={classes.TimerGame}>{timerData}</p>
    </div>
  );
};

export default TimerGame;
