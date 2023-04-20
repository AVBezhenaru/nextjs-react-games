import { useEffect, useMemo } from 'react';

import { ModeInfoObject } from '../types/modes';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectGameIsStarted } from '../../reducers/game-slice';
import { addTimeFromStart, selectTimeFromStart } from '../../reducers/statistics-slice';

type UseTimeInfo = () => ModeInfoObject;

export const useTimeInfo: UseTimeInfo = () => {
  const dispatch = useAppDispatch();
  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const timeFromStart = useAppSelector(selectTimeFromStart);

  useEffect(() => {
    if (gameIsStarted) {
      const timerID = setInterval(() => {
        dispatch(addTimeFromStart(100));
      }, 100);

      return () => clearInterval(timerID);
    }
  }, [gameIsStarted]);

  return useMemo<ModeInfoObject>(
    () => ({
      label: 'Time',
      value: timeFromStart,
    }),
    [timeFromStart],
  );
};
