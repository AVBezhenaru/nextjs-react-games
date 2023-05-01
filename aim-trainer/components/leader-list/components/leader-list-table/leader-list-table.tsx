import { useMemo } from 'react';

import { DifficultyModeData } from '../../../../reducers/leader-list-slice';
import { LeaderListItem } from '../leader-list-item/leader-list-item';

import { StyledLeaderListTable } from './leader-list-table.styles';

type Props = {
  data: DifficultyModeData[];
};

export const LeaderListTable = (props: Props) => {
  const { data } = props;

  const listItems = useMemo(() => {
    return data.map((el, i) => <LeaderListItem {...el} key={i} />);
  }, [data]);

  return <StyledLeaderListTable>{listItems}</StyledLeaderListTable>;
};
