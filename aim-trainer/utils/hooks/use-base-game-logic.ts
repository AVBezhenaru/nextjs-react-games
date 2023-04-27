import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  resetGameData,
  selectDeathCount,
  selectGameIsStarted,
  selectLives,
  setGameStatus,
} from '../../reducers/game-slice';
import { GameStatus } from '../enums/game-status';
import {
  addTimeFromStart,
  resetGameStat,
  selectGameSpeed,
  setSpeed,
} from '../../reducers/statistics-slice';
import { selectCurrentGameDifficulty, setGameDifficulty } from '../../reducers/difficulty-slice';
import { clearTargets } from '../../reducers/targets-slice';
import { DifficultyLevels } from '../enums/difficulty-levels';

export const useBaseGameLogic = () => {
  const dispatch = useAppDispatch();
  const lives = useAppSelector(selectLives);
  const death = useAppSelector(selectDeathCount);
  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const speed = useAppSelector(selectGameSpeed);
  const { speedIncrementPerSecond } = useAppSelector(selectCurrentGameDifficulty);

  const resetAllGameData = () => {
    dispatch(resetGameData());
    dispatch(resetGameStat());
  };

  useEffect(() => {
    if (lives <= death) {
      dispatch(setGameStatus(GameStatus.Over));
      dispatch(clearTargets());
    }
  }, [lives, death]);

  useEffect(() => {
    dispatch(setGameDifficulty(DifficultyLevels.Normal));

    return resetAllGameData;
  }, []);

  useEffect(() => {
    if (gameIsStarted) {
      const timerID = setInterval(() => {
        dispatch(addTimeFromStart(100));
      }, 100);

      return () => clearInterval(timerID);
    }
  }, [gameIsStarted]);

  useEffect(() => {
    if (gameIsStarted) {
      const timerID = setTimeout(() => {
        console.log(speed, speedIncrementPerSecond);
        dispatch(setSpeed(speed + (speedIncrementPerSecond || 0)));
      }, 1000);

      return () => clearTimeout(timerID);
    }
  }, [gameIsStarted, speed]);
};
