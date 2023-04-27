import { useCallback, useEffect } from 'react';

import { Board } from '../../components/board/board';
import { useAppDispatch, useAppSelector } from '../../../hooks';
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
import { useDifficulty } from '../../utils/hooks/use-difficulty';

import { useChallengeTargets } from './hooks/use-challenge-targets';
import { useChallengeMode } from './hooks/use-challenge-mode';
import {
  CHALLENGE_DIFFICULTY_MODES_INFO,
  easyChallengeDifficulty,
  normalChallengeDifficulty,
  hardChallengeDifficulty,
} from './const/challenge-difficulty-levels';
import { ChallengeCustomDifficultyForm } from './components/challenge-custom-difficulty-form/challenge-custom-difficulty-form';

export const Challenge = () => {
  const dispatch = useAppDispatch();
  const lives = useAppSelector(selectLives);
  const death = useAppSelector(selectDeathCount);

  const targetCreator = useChallengeTargets();
  useChallengeMode();
  useDifficulty({
    easy: easyChallengeDifficulty,
    normal: normalChallengeDifficulty,
    hard: hardChallengeDifficulty,
  });

  useEffect(() => {
    if (lives <= death) {
      dispatch(setGameStatus(GameStatus.Over));
    }
  }, [lives, death]);

  useEffect(() => {
    return () => {
      dispatch(resetGameData());
      dispatch(resetGameStat());
    };
  }, []);

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
    <>
      <ChallengeCustomDifficultyForm />
      <Board
        targetCreator={targetCreator}
        hitHandler={hitHandler}
        missHandler={missHandler}
        difficultyModes={CHALLENGE_DIFFICULTY_MODES_INFO}
      />
    </>
  );
};
