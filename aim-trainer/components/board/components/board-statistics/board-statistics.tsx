import { ReactElement, useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { resetGameStat, selectStatItems } from '../../../../reducers/statistics-slice';
import { BoardStatisticsItem } from '../board-statistics-item/board-statistics-item';
import { Button } from '../../../button/button.styles';
import { resetGameData, setGameStatus } from '../../../../reducers/game-slice';
import { GameStatus } from '../../../../utils/enums/game-status';
import { SimpleButton, SimpleButtonTypes } from '../../../simple-button/simple-button.styles';

import {
  BoardStatisticsItems,
  BoardStatisticsTitle,
  StyledBoardStatistics,
} from './board-statistics.styles';

export const BoardStatistics = () => {
  const dispatch = useAppDispatch();
  const statItems = useAppSelector(selectStatItems);

  const statElements = useMemo<ReactElement[]>(
    () =>
      statItems.map(({ value, label }) => (
        <BoardStatisticsItem value={value} label={label} key={label} />
      )),
    [statItems],
  );

  const restartGameHandler = useCallback(() => {
    dispatch(resetGameData());
    dispatch(resetGameStat());
    dispatch(setGameStatus(GameStatus.Pending));
  }, []);

  const changeDifficultyHandler = useCallback(() => {
    dispatch(setGameStatus(GameStatus.Idle));
  }, []);

  return (
    <StyledBoardStatistics>
      <BoardStatisticsTitle>Stats: </BoardStatisticsTitle>
      <BoardStatisticsItems>{statElements}</BoardStatisticsItems>

      <Button onClick={restartGameHandler}>Restart</Button>
      <SimpleButton buttonType={SimpleButtonTypes.Text} onClick={changeDifficultyHandler}>
        Change Difficulty Level
      </SimpleButton>
    </StyledBoardStatistics>
  );
};
