import { useCallback, useEffect, useState } from 'react';

import { Board } from '../../components/board/board';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  resetGameData,
  selectDeathCount,
  selectGameDifficulty,
  selectLives,
  setGameDifficulty,
  setGameStatus,
  setLives,
} from '../../reducers/game-slice';
import { removeTarget } from '../../reducers/targets-slice';
import { TargetHitHandler } from '../../utils/types/target';
import { addHit, addMiss, resetGameStat, setSpeed } from '../../reducers/statistics-slice';
import { GameStatus } from '../../utils/enums/game-status';
import { DifficultyLevels } from '../../utils/enums/difficulty-levels';
import { DifficultyLevel } from '../../utils/types/difficulty';

import { useChallengeTargets } from './hooks/use-challenge-targets';
import { useChallengeMode } from './hooks/use-challenge-mode';
import {
  CHALLENGE_DIFFICULTY_MODES_INFO,
  easyChallengeDifficulty,
  hardChallengeDifficulty,
  normalChallengeDifficulty,
} from './const/challenge-difficulty-levels';
import { ChallengeCustomDifficultyForm } from './components/challenge-custom-difficulty-form/challenge-custom-difficulty-form';
import { StyledChallengeMode } from './challenge.styles';

export const Challenge = () => {
  const dispatch = useAppDispatch();
  const lives = useAppSelector(selectLives);
  const death = useAppSelector(selectDeathCount);

  const gameDifficulty = useAppSelector(selectGameDifficulty);

  const [currentDifficulty, setCurrentDifficulty] =
    useState<DifficultyLevel>(normalChallengeDifficulty);
  const [customDifficulty, setCustomDifficulty] = useState<DifficultyLevel | null>();
  const [showCustomDifficultyForm, setShowCustomDifficultyForm] = useState<boolean>(false);

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
      case DifficultyLevels.Custom:
        setShowCustomDifficultyForm(true);
        break;
    }
  }, [gameDifficulty]);

  useEffect(() => {
    dispatch(setLives(currentDifficulty.lives));
    dispatch(setSpeed(currentDifficulty.defaultSpeed));
  }, [currentDifficulty]);

  useEffect(() => {
    if (customDifficulty) {
      setCurrentDifficulty(customDifficulty);
    }
  }, [customDifficulty]);

  const targetCreator = useChallengeTargets(currentDifficulty);
  useChallengeMode(currentDifficulty);

  useEffect(() => {
    if (lives <= death) {
      dispatch(setGameStatus(GameStatus.Over));
    }
  }, [lives, death]);

  useEffect(() => {
    setShowCustomDifficultyForm(false);

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

  const setCustomDifficultyHandler = (values: DifficultyLevel) => {
    setCustomDifficulty(values);
    setShowCustomDifficultyForm(false);
  };

  const DifficultyFormCloseHandler = () => {
    setShowCustomDifficultyForm(false);
    dispatch(setGameDifficulty(DifficultyLevels.Normal));
  };

  return (
    <StyledChallengeMode>
      <ChallengeCustomDifficultyForm
        open={showCustomDifficultyForm}
        onSubmit={setCustomDifficultyHandler}
        onClose={DifficultyFormCloseHandler}
        currentDifficulty={currentDifficulty}
      />
      <Board
        targetCreator={targetCreator}
        hitHandler={hitHandler}
        missHandler={missHandler}
        difficultyModes={CHALLENGE_DIFFICULTY_MODES_INFO}
      />
    </StyledChallengeMode>
  );
};
