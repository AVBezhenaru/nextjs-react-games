import { useEffect, useMemo } from 'react';

import { ModeInfoObject } from '../types/modes';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectGameIsStarted } from '../../reducers/game-slice';
import { selectGameSpeed, setSpeed } from '../../reducers/statistics-slice';

type UseSpawnSpeed = (baseSpeed: number, incrementPerSecond: number) => ModeInfoObject;

export const useSpawnSpeed: UseSpawnSpeed = (baseSpeed, incrementPerSecond) => {
  const dispatch = useAppDispatch();
  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const speed = useAppSelector(selectGameSpeed);

  const fixedSpeed = useMemo<string>(() => speed.toFixed(2), [speed]);

  useEffect(() => {
    if (gameIsStarted) {
      const timerID = setTimeout(() => {
        dispatch(setSpeed(speed + incrementPerSecond));
      }, 1000);

      return () => clearTimeout(timerID);
    }
  }, [gameIsStarted, speed]);

  return useMemo<ModeInfoObject>(
    () => ({
      label: 'Speed',
      value: `${fixedSpeed} t/s`,
    }),
    [fixedSpeed],
  );
};
