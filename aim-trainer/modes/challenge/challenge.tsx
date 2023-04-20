import { useCallback, useEffect } from 'react';

import { Board } from '../../components/board/board';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectBoardSizes } from '../../reducers/board-slice';
import {
  resetGameData,
  selectDeathCount,
  selectLives,
  setGameStatus,
} from '../../reducers/game-slice';
import { removeTarget } from '../../reducers/targets-slice';
import { TargetHitHandler } from '../../utils/types/target';
import { addHit, addMiss, resetGameStat } from '../../reducers/statistics-slice';
import { GameStatus } from '../../utils/enums/game-status';

import { useChallengeTargets } from './use-challenge-targets';
import { useChallengeMode } from './use-challenge-mode';

export const Challenge = () => {
  const dispatch = useAppDispatch();
  const boardSizes = useAppSelector(selectBoardSizes);
  const lives = useAppSelector(selectLives);
  const death = useAppSelector(selectDeathCount);

  const targetCreator = useChallengeTargets(boardSizes);
  useChallengeMode();

  useEffect(() => {
    if (lives <= death) {
      dispatch(setGameStatus(GameStatus.Over));
    }
  }, [lives, death]);

  useEffect(
    () => () => {
      dispatch(resetGameData());
      dispatch(resetGameStat());
    },
    [],
  );

  const hitHandler = useCallback<TargetHitHandler>(
    (id) => {
      dispatch(removeTarget(id));
      targetCreator();
      dispatch(addHit());
    },
    [removeTarget],
  );

  const missHandler = useCallback(() => {
    console.log('miss');
    dispatch(addMiss());
  }, []);

  return (
    <div>
      <Board targetCreator={targetCreator} hitHandler={hitHandler} missHandler={missHandler} />
    </div>
  );
};
