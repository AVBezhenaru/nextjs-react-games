import { formatDistanceToNow } from 'date-fns';

import { DifficultyModeData } from '../../../../reducers/leader-list-slice';

import {
  LeaderListItemDate,
  LeaderListItemNickname,
  StyledLeaderListItem,
} from './leader-list-item.styles';

type Props = DifficultyModeData;

export const LeaderListItem = (props: Props) => {
  const { statItems, timestamp, nickname } = props;
  const items = statItems.map(({ label, value }) => (
    <span key={`${label}${value}`}>
      {label}: {value}
    </span>
  ));
  const date = formatDistanceToNow(timestamp);

  return (
    <StyledLeaderListItem>
      {nickname && <LeaderListItemNickname>{nickname}</LeaderListItemNickname>}
      {items}
      <LeaderListItemDate>{date}</LeaderListItemDate>
    </StyledLeaderListItem>
  );
};
