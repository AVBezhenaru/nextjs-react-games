import { useCallback, useEffect } from 'react';

import { SizeType } from '../../utils/types/sizes';
import { getRandomNumber } from '../../utils/lib/get-random-number';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addTarget, selectTargets } from '../../reducers/targets-slice';
import {
  selectGameIsIdle,
  selectGameIsOver,
  selectGameIsPending,
  selectGameIsStarted,
} from '../../reducers/game-slice';
import { selectGameSpeed } from '../../reducers/statistics-slice';
import { TargetConfiguration } from '../../utils/types/target';

type GetChallengeTargetConfig = (
  boardSize: SizeType,
  lifetime: number,
  targetSize: number,
) => TargetConfiguration;
const getChallengeTargetConfig: GetChallengeTargetConfig = (boardSize, lifetime, targetSize) => ({
  position: {
    x: getRandomNumber(40, boardSize.w - targetSize - 40),
    y: getRandomNumber(40, boardSize.h - targetSize - 40),
  },
  size: targetSize,
  lifetime,
});

type UseChallengeTargets = (boardSize: SizeType) => () => void;
export const useChallengeTargets: UseChallengeTargets = (boardSize) => {
  const targets = useAppSelector(selectTargets);
  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const speed = useAppSelector(selectGameSpeed);

  const dispatch = useAppDispatch();

  const createChallengeTarget = useCallback(() => {
    dispatch(addTarget(getChallengeTargetConfig(boardSize, 10000, 50)));
  }, [boardSize]);

  useEffect(() => {
    if (targets.length <= 9 && gameIsStarted) {
      const timerID = setTimeout(() => {
        createChallengeTarget();
      }, 1000 / speed);

      return () => clearTimeout(timerID);
    }
  }, [targets, gameIsStarted]);

  return createChallengeTarget;
};
