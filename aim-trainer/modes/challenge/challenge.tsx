import { useCallback } from 'react';

import { Board } from '../../components/board/board';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeTarget } from '../../reducers/targets-slice';
import { TargetHitHandler } from '../../utils/types/target';
import {
  addHit,
  addMiss,
  selectAccuracy,
  selectGameSpeedStr,
  selectScore,
  selectTimeFromStart,
} from '../../reducers/statistics-slice';
import { useDifficulty } from '../../utils/hooks/use-difficulty';
import { useBaseGameLogic } from '../../utils/hooks/use-base-game-logic';
import { useDefaultTargets } from '../../utils/hooks/use-default-targets';
import { useTopStatistics } from '../../utils/hooks/use-top-statistics';
import { useGameStatistics } from '../../utils/hooks/use-game-statistics';
import { DEFAULT_DIFFICULTY_MODES_INFO } from '../../utils/const/default-difficulty-modes-info';
import { LeaderList } from '../../components/leader-list/leader-list';
import { GameModesPaths } from '../../utils/enums/game-modes-paths';
import { useLeaderBoard } from '../../utils/hooks/use-leader-board';

import {
  easyChallengeDifficulty,
  hardChallengeDifficulty,
  normalChallengeDifficulty,
} from './const/challenge-difficulty-levels';
import { ChallengeCustomDifficultyForm } from './components/challenge-custom-difficulty-form/challenge-custom-difficulty-form';

export const Challenge = () => {
  const dispatch = useAppDispatch();

  const timeFromStart = useAppSelector(selectTimeFromStart);
  const hits = useAppSelector(selectScore);
  const speedStr = useAppSelector(selectGameSpeedStr);
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
      { label: 'Speed', value: speedStr },
    ],
    [timeFromStart, hits, speedStr],
  );
  useGameStatistics(() => [
    { label: 'Hit Targets', value: hits },
    { label: 'Accuracy', value: accuracy },
    { label: 'Final Speed', value: speedStr },
    { label: 'Time', value: timeFromStart },
  ]);
  useLeaderBoard(
    () => [
      { label: 'Hits', value: hits },
      { label: 'Accuracy', value: accuracy },
    ],
    GameModesPaths.Challenge,
    (a, b) => Number(b.statItems[0].value) - Number(a.statItems[0].value),
  );

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
      <LeaderList mode={GameModesPaths.Challenge} />
    </>
  );
};
