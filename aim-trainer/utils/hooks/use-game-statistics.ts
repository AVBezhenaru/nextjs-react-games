import { useEffect } from 'react';

import { StatCreator } from '../types/statistics';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectGameIsOver } from '../../reducers/game-slice';
import { setStatItems } from '../../reducers/statistics-slice';

type UseGameStatistics = (statCreator: StatCreator) => void;

export const useGameStatistics: UseGameStatistics = (statCreator) => {
  const dispatch = useAppDispatch();
  const gameIsOver = useAppSelector(selectGameIsOver);

  useEffect(() => {
    if (gameIsOver) {
      dispatch(setStatItems(statCreator()));
    }
  }, [gameIsOver]);
};
