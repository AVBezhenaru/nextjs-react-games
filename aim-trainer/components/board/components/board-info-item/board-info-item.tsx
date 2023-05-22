import { memo } from 'react';

import { ModeInfoObject } from '../../../../utils/types/modes';

import {
  BoardInfoItemLabel,
  BoardInfoItemValue,
  StyledBoardInfoItem,
} from './board-info-item.styles';

type Props = ModeInfoObject;

export const BoardInfoItem = memo((props: Props) => {
  const { label, value } = props;

  return (
    <StyledBoardInfoItem>
      <BoardInfoItemLabel>{label}: </BoardInfoItemLabel>
      <BoardInfoItemValue>{value}</BoardInfoItemValue>
    </StyledBoardInfoItem>
  );
});
