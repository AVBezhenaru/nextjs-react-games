import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectGameIsStarted } from '../../reducers/game-slice';
import { setModeInfoArray } from '../../reducers/board-slice';
import { StatCreator } from '../types/statistics';

type UseTopStatistics = (statCreator: StatCreator, deps: any[]) => void;

export const useTopStatistics: UseTopStatistics = (statCreator, deps) => {
  const dispatch = useAppDispatch();
  const gameIsStarted = useAppSelector(selectGameIsStarted);

  useEffect(() => {
    if (gameIsStarted) {
      dispatch(setModeInfoArray(statCreator()));
    }
  }, [gameIsStarted, ...deps]);
};
