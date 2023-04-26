import { useCallback, useEffect, useState } from 'react';

import { Board } from '../../components/board/board';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  resetGameData,
  selectDeathCount,
  selectGameDifficulty,
  selectLives,
  setGameStatus,
  setLives,
} from '../../reducers/game-slice';
import { removeTarget } from '../../reducers/targets-slice';
import { TargetHitHandler } from '../../utils/types/target';
import { addHit, addMiss, resetGameStat, setSpeed } from '../../reducers/statistics-slice';
import { GameStatus } from '../../utils/enums/game-status';
import { DifficultyLevels } from '../../utils/enums/difficulty-levels';
import { DifficultyLevel } from '../../utils/types/difficulty';

import { useChallengeTargets } from './use-challenge-targets';
import { useChallengeMode } from './use-challenge-mode';
import {
  CHALLENGE_DIFFICULTY_MODES_INFO,
  easyChallengeDifficulty,
  hardChallengeDifficulty,
  normalChallengeDifficulty,
} from './challenge-difficulty-levels';

export const Challenge = () => {
  const dispatch = useAppDispatch();
  const lives = useAppSelector(selectLives);
  const death = useAppSelector(selectDeathCount);
  const gameDifficulty = useAppSelector(selectGameDifficulty);

  const [currentDifficulty, setCurrentDifficulty] =
    useState<DifficultyLevel>(normalChallengeDifficulty);

  useEffect(() => {
    switch (gameDifficulty) {
      case DifficultyLevels.Easy:
        setCurrentDifficulty(easyChallengeDifficulty);
        break;
      case DifficultyLevels.Normal:
        setCurrentDifficulty(normalChallengeDifficulty);
        break;
      case DifficultyLevels.Hard:
        setCurrentDifficulty(hardChallengeDifficulty);
        break;
    }
  }, [gameDifficulty]);

  useEffect(() => {
    dispatch(setLives(currentDifficulty.lives));
    dispatch(setSpeed(currentDifficulty.defaultSpeed));
  }, [currentDifficulty]);

  const targetCreator = useChallengeTargets(currentDifficulty);
  useChallengeMode(currentDifficulty);

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

  const missHandler = useCallback(() => dispatch(addMiss()), []);

  return (
    <div>
      <Board
        targetCreator={targetCreator}
        hitHandler={hitHandler}
        missHandler={missHandler}
        difficultyModes={CHALLENGE_DIFFICULTY_MODES_INFO}
      />
    </div>
  );
};
