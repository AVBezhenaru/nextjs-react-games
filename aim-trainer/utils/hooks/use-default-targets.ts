import { useCallback, useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';

import { selectBoardSizes } from '../../reducers/board-slice';
import { TargetAnimationTypes, TargetConfiguration, TargetCreator } from '../types/target';
import { selectGameSpeed } from '../../reducers/statistics-slice';
import { addTarget, selectTargets } from '../../reducers/targets-slice';
import { getRandomNumber } from '../lib/get-random-number';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectCurrentGameDifficulty } from '../../reducers/difficulty-slice';
import { selectGameIsStarted } from '../../reducers/game-slice';
import { SizeType } from '../types/sizes';

type GetTargetConfigOptions = {
  boardSize: SizeType;
  lifetime: number;
  targetSize: number;
  animationType: TargetAnimationTypes;
  offset: number;
};
type GetTargetConfig = (options: GetTargetConfigOptions) => TargetConfiguration;

const getTargetConfig: GetTargetConfig = (options) => {
  const { boardSize, lifetime, targetSize, animationType, offset } = options;

  return {
    position: {
      x: getRandomNumber(offset, boardSize.w - targetSize - offset),
      y: getRandomNumber(offset, boardSize.h - targetSize - offset),
    },
    size: targetSize,
    lifetime,
    animationType,
  };
};

type TargetConfig = {
  animationType?: TargetAnimationTypes;
};

type UseDefaultTargets = (config?: TargetConfig) => TargetCreator;

export const useDefaultTargets: UseDefaultTargets = (
  config = { animationType: TargetAnimationTypes.scale },
) => {
  const targets = useAppSelector(selectTargets);
  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const speed = useAppSelector(selectGameSpeed);
  const boardSize = useAppSelector(selectBoardSizes);
  const { lifetime, targetSize, maxTargetCount } = useAppSelector(selectCurrentGameDifficulty);
  const theme = useTheme();

  const currentBoardSize = useRef<SizeType>(boardSize);

  const dispatch = useAppDispatch();

  const createTarget = useCallback(() => {
    dispatch(
      addTarget(
        getTargetConfig({
          boardSize: currentBoardSize.current,
          lifetime,
          targetSize,
          animationType: config.animationType,
          offset: parseInt(theme.borders.baseRadius, 10),
        }),
      ),
    );
  }, [lifetime, targetSize, maxTargetCount]);

  useEffect(() => {
    currentBoardSize.current = boardSize;
  }, [boardSize]);

  useEffect(() => {
    if (gameIsStarted && targets.length < maxTargetCount) {
      if (!targets.length) {
        createTarget();
      }

      const timerID = setTimeout(() => {
        createTarget();
      }, 1000 / speed);

      return () => clearTimeout(timerID);
    }
  }, [gameIsStarted, targets]);

  return createTarget;
};
