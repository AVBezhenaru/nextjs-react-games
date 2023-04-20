import { ReactElement, useMemo } from 'react';

import { StyledBoardInfo, StyledBoardInfoItems } from '../../board.styles';
import { BoardInfoItem } from '../board-info-item/board-info-item';
import { useAppSelector } from '../../../../../hooks';
import { selectDeathCount, selectLives } from '../../../../reducers/game-slice';
import { LivesCounter } from '../../../lives-counter/lives-counter';
import { selectModeInfo } from '../../../../reducers/board-slice';

export const BoardInfo = () => {
  const modeInfo = useAppSelector(selectModeInfo);
  const modeInfoElements = useMemo<ReactElement[]>(
    () => modeInfo.map((item) => <BoardInfoItem {...item} key={item.label} />),
    [modeInfo],
  );

  const livesCount = useAppSelector(selectLives);
  const deathCount = useAppSelector(selectDeathCount);

  return (
    <StyledBoardInfo>
      <StyledBoardInfoItems>{modeInfoElements}</StyledBoardInfoItems>
      <LivesCounter deathCount={deathCount} totalCount={livesCount} />
    </StyledBoardInfo>
  );
};
