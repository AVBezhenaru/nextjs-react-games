import { useEffect, useState } from 'react';

import { StatCreator } from '../types/statistics';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectGameDifficulty } from '../../reducers/difficulty-slice';
import { GameModesPaths } from '../enums/game-modes-paths';
import {
  DifficultyModeData,
  selectLocalModeData,
  setModeData,
} from '../../reducers/leader-list-slice';
import { selectGameIsOver, selectGameIsStarted } from '../../reducers/game-slice';
import { DifficultyLevels } from '../enums/difficulty-levels';

type SortCb = (a: DifficultyModeData, b: DifficultyModeData) => number;

export const useLeaderBoard = (statCreator: StatCreator, mode: GameModesPaths, sortCb: SortCb) => {
  const dispatch = useAppDispatch();

  const currentDifficulty = useAppSelector(selectGameDifficulty);
  const modeData = useAppSelector(selectLocalModeData(mode));
  const gameIsOver = useAppSelector(selectGameIsOver);
  const gameIsStarted = useAppSelector(selectGameIsStarted);

  const [isSetted, setIsSetted] = useState(false);

  useEffect(() => {
    if (gameIsStarted) {
      setIsSetted(false);
    }
  }, [gameIsStarted]);

  useEffect(() => {
    if (gameIsOver && currentDifficulty !== DifficultyLevels.Custom) {
      const localModeData: DifficultyModeData[] = [
        ...(modeData[currentDifficulty] || []),
        {
          statItems: statCreator(),
          timestamp: Date.now(),
        },
      ];

      localModeData.sort(sortCb);

      if (!isSetted) {
        dispatch(
          setModeData({
            difficulty: currentDifficulty,
            data: localModeData.slice(0, 10),
            mode,
          }),
        );

        setIsSetted(true);
      }
    }
  }, [gameIsOver]);
};
