import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setModeInfoArray } from '../../../reducers/board-slice';
import { useTimeInfo } from '../../../utils/hooks/use-time-info';
import { useSpawnSpeed } from '../../../utils/hooks/use-spawn-speed';
import { resetGameData, selectGameIsOver, selectGameIsStarted } from '../../../reducers/game-slice';
import { useHitsCounter } from '../../../utils/hooks/use-hits-counter';
import { resetGameStat, selectAccuracy, setStatItems } from '../../../reducers/statistics-slice';
import { DifficultyLevel } from '../../../utils/types/difficulty';

type UseChallengeMode = (diff: DifficultyLevel) => void;

export const useChallengeMode: UseChallengeMode = ({ defaultSpeed, speedIncrementPerSecond }) => {
  const dispatch = useAppDispatch();

  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const gameIsOver = useAppSelector(selectGameIsOver);
  const accuracy = useAppSelector(selectAccuracy);

  const timeFromStartObj = useTimeInfo();
  const targetSpeedObj = useSpawnSpeed(defaultSpeed, speedIncrementPerSecond);
  const hitsObj = useHitsCounter();

  useEffect(() => {
    if (gameIsStarted) {
      dispatch(setModeInfoArray([timeFromStartObj, hitsObj, targetSpeedObj]));
    } else if (gameIsOver) {
      dispatch(
        setStatItems([
          { label: 'Hit Targets', value: hitsObj.value },
          { label: 'Accuracy', value: accuracy },
          { label: 'Final Speed', value: targetSpeedObj.value },
          timeFromStartObj,
        ]),
      );
    }
  }, [timeFromStartObj, hitsObj, targetSpeedObj, gameIsStarted, gameIsOver]);

  useEffect(
    () => () => {
      dispatch(resetGameData());
      dispatch(resetGameStat());
    },
    [],
  );
};
