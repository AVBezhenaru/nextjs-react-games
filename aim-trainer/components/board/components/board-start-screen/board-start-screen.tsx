import { useContext, useMemo } from 'react';

import { setGameStatus } from '../../../../reducers/game-slice';
import { GameStatus } from '../../../../utils/enums/game-status';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { BoardContext } from '../../board-context';
import { DifficultyModeInfoOnSelect } from '../../../../utils/types/difficulty';
import { selectGameDifficulty, setGameDifficulty } from '../../../../reducers/difficulty-slice';

import {
  SelectModeButton,
  SelectModeButtonWrapper,
  StartGameButton,
  StyledBoardStartScreen,
} from './board-start-screen.styles';

export const BoardStartScreen = () => {
  const { difficultyModes } = useContext(BoardContext);

  const dispatch = useAppDispatch();
  const currentDifficultyMode = useAppSelector(selectGameDifficulty);

  const startGameHandler = () => {
    dispatch(setGameStatus(GameStatus.Pending));
  };

  const defaultOnSelect: DifficultyModeInfoOnSelect = (type) => {
    dispatch(setGameDifficulty(type));
  };

  const difficultyButtons = useMemo(
    () =>
      difficultyModes.map((el) => {
        const onSelect = () => (el.onSelect ? el.onSelect(el.type) : defaultOnSelect(el.type));

        return (
          <SelectModeButton
            active={el.type === currentDifficultyMode}
            key={el.type}
            onClick={onSelect}
          >
            {el.label}
          </SelectModeButton>
        );
      }),
    [difficultyModes, currentDifficultyMode],
  );

  return (
    <StyledBoardStartScreen>
      <SelectModeButtonWrapper>{difficultyButtons}</SelectModeButtonWrapper>
      <StartGameButton onClick={startGameHandler}>Start</StartGameButton>
    </StyledBoardStartScreen>
  );
};
