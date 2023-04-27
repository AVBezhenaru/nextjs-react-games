import { useCallback } from 'react';

import { Board } from '../../components/board/board';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeTarget } from '../../reducers/targets-slice';
import { TargetHitHandler } from '../../utils/types/target';
import {
  addHit,
  addMiss,
  selectAccuracy,
  selectGameSpeed,
  selectScore,
  selectTimeFromStart,
} from '../../reducers/statistics-slice';
import { useDifficulty } from '../../utils/hooks/use-difficulty';
import { useBaseGameLogic } from '../../utils/hooks/use-base-game-logic';
import { useDefaultTargets } from '../../utils/hooks/use-default-targets';
import { useTopStatistics } from '../../utils/hooks/use-top-statistics';
import { useGameStatistics } from '../../utils/hooks/use-game-statistics';
import { DEFAULT_DIFFICULTY_MODES_INFO } from '../../utils/const/default-difficulty-modes-info';

import {
  easyChallengeDifficulty,
  normalChallengeDifficulty,
  hardChallengeDifficulty,
} from './const/challenge-difficulty-levels';
import { ChallengeCustomDifficultyForm } from './components/challenge-custom-difficulty-form/challenge-custom-difficulty-form';

export const Challenge = () => {
  const dispatch = useAppDispatch();

  const timeFromStart = useAppSelector(selectTimeFromStart);
  const hits = useAppSelector(selectScore);
  const speed = useAppSelector(selectGameSpeed);
  const accuracy = useAppSelector(selectAccuracy);

  const targetCreator = useDefaultTargets();
  useBaseGameLogic();
  useDifficulty({
    easy: easyChallengeDifficulty,
    normal: normalChallengeDifficulty,
    hard: hardChallengeDifficulty,
  });

  useTopStatistics(
    () => [
      { label: 'Time', value: timeFromStart },
      { label: 'Hits', value: hits },
      { label: 'Speed', value: `${speed.toFixed(2)} t/s` },
    ],
    [timeFromStart, hits, speed],
  );
  useGameStatistics(() => [
    { label: 'Hit Targets', value: hits },
    { label: 'Accuracy', value: accuracy },
    { label: 'Final Speed', value: `${speed.toFixed(2)} t/s` },
    { label: 'Time', value: timeFromStart },
  ]);

  const hitHandler = useCallback<TargetHitHandler>(
    (id) => {
      dispatch(removeTarget(id));
      targetCreator();
      dispatch(addHit());
    },
    [targetCreator],
  );

  const missHandler = useCallback(() => dispatch(addMiss()), []);

  return (
    <>
      <ChallengeCustomDifficultyForm />
      <Board
        targetCreator={targetCreator}
        hitHandler={hitHandler}
        missHandler={missHandler}
        difficultyModes={DEFAULT_DIFFICULTY_MODES_INFO}
      />
    </>
  );
};
