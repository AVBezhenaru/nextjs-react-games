import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectCurrentGameDifficulty,
  selectCustomGameDifficulty,
  selectGameDifficulty,
  setCurrentDifficulty,
} from '../../reducers/difficulty-slice';
import { DifficultyLevels } from '../enums/difficulty-levels';
import { resetGameStat, setSpeed } from '../../reducers/statistics-slice';
import { resetGameData, setLives } from '../../reducers/game-slice';
import { DifficultyLevel } from '../types/difficulty';

type UseDifficulty = (levels: {
  easy: DifficultyLevel;
  normal: DifficultyLevel;
  hard: DifficultyLevel;
}) => void;

export const useDifficulty: UseDifficulty = (levels) => {
  const { easy, normal, hard } = levels;

  const dispatch = useAppDispatch();
  const gameDifficultyType = useAppSelector(selectGameDifficulty);
  const customDifficulty = useAppSelector(selectCustomGameDifficulty);
  const currentDifficulty = useAppSelector(selectCurrentGameDifficulty);

  useEffect(() => {
    switch (gameDifficultyType) {
      case DifficultyLevels.Easy:
        dispatch(setCurrentDifficulty(easy));
        break;
      case DifficultyLevels.Normal:
        dispatch(setCurrentDifficulty(normal));
        break;
      case DifficultyLevels.Hard:
        dispatch(setCurrentDifficulty(hard));
        break;
    }
  }, [gameDifficultyType]);

  useEffect(() => {
    if (customDifficulty) {
      dispatch(resetGameStat());
      dispatch(resetGameData());
      dispatch(setCurrentDifficulty(customDifficulty));
    }
  }, [customDifficulty]);

  useEffect(() => {
    dispatch(setLives(currentDifficulty.lives));
    dispatch(setSpeed(currentDifficulty.defaultSpeed));
  }, [currentDifficulty]);
};
