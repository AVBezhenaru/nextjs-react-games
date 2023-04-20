import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setModeInfoArray } from '../../reducers/board-slice';
import { useTimeInfo } from '../../utils/hooks/use-time-info';
import { useSpawnSpeed } from '../../utils/hooks/use-spawn-speed';
import { resetGameData, selectGameIsOver, selectGameIsStarted } from '../../reducers/game-slice';
import { useHitsCounter } from '../../utils/hooks/use-hits-counter';
import { resetGameStat, selectAccuracy, setStatItems } from '../../reducers/statistics-slice';

type UseChallengeMode = () => void;

export const useChallengeMode: UseChallengeMode = () => {
  const dispatch = useAppDispatch();

  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const gameIsOver = useAppSelector(selectGameIsOver);
  const accuracy = useAppSelector(selectAccuracy);

  const timeFromStartObj = useTimeInfo();
  const targetSpeedObj = useSpawnSpeed(2, 0.01);
  const hitsObj = useHitsCounter();

  useEffect(() => {
    console.log(gameIsOver);
    if (gameIsStarted) {
      dispatch(setModeInfoArray([timeFromStartObj, hitsObj, targetSpeedObj]));
    } else if (gameIsOver) {
      console.log('game is over');
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
