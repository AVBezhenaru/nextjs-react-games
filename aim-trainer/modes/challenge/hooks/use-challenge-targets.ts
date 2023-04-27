import { useCallback, useEffect, useRef } from 'react';

import { SizeType } from '../../../utils/types/sizes';
import { getRandomNumber } from '../../../utils/lib/get-random-number';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { addTarget, selectTargets } from '../../../reducers/targets-slice';
import { selectGameIsStarted } from '../../../reducers/game-slice';
import { selectGameSpeed } from '../../../reducers/statistics-slice';
import { TargetConfiguration } from '../../../utils/types/target';
import { selectBoardSizes } from '../../../reducers/board-slice';
import { selectCurrentGameDifficulty } from '../../../reducers/difficulty-slice';

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

type UseChallengeTargets = () => () => void;

export const useChallengeTargets: UseChallengeTargets = () => {
  const targets = useAppSelector(selectTargets);
  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const speed = useAppSelector(selectGameSpeed);
  const boardSize = useAppSelector(selectBoardSizes);
  const { lifetime, targetSize, maxTargetCount } = useAppSelector(selectCurrentGameDifficulty);

  const currentBoardSize = useRef<SizeType>(boardSize);

  const dispatch = useAppDispatch();

  const createChallengeTarget = useCallback(() => {
    dispatch(addTarget(getChallengeTargetConfig(currentBoardSize.current, lifetime, targetSize)));
  }, [boardSize, lifetime, targetSize]);

  useEffect(() => {
    currentBoardSize.current = boardSize;
  }, [boardSize]);

  useEffect(() => {
    if (gameIsStarted && targets.length < maxTargetCount) {
      if (!targets.length) {
        createChallengeTarget();
      }

      const timerID = setTimeout(() => {
        createChallengeTarget();
      }, 1000 / speed);

      return () => clearTimeout(timerID);
    }
  }, [gameIsStarted, targets]);

  return createChallengeTarget;
};
