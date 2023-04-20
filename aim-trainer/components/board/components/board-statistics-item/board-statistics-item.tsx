import { memo } from 'react';

import { StatItem } from '../../../../utils/types/statistics';

import {
  BoardStatItemLabel,
  BoardStatItemValue,
  StyledBoardStatisticsItem,
} from './board-statistics-item.styles';

type Props = StatItem;

export const BoardStatisticsItem = memo((props: Props) => {
  const { label, value } = props;

  return (
    <StyledBoardStatisticsItem>
      <BoardStatItemLabel>{label}:</BoardStatItemLabel>{' '}
      <BoardStatItemValue>{value}</BoardStatItemValue>
    </StyledBoardStatisticsItem>
  );
});
