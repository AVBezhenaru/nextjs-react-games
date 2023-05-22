import { useEffect, useState } from 'react';

import { GameModesPaths } from '../../../../utils/enums/game-modes-paths';
import { useAppSelector } from '../../../../../hooks';
import { selectLocalModeData } from '../../../../reducers/leader-list-slice';
import { Tabs } from '../../../tabs/tabs';
import { LeaderListTable } from '../leader-list-table/leader-list-table';
import { DEFAULT_DIFFICULTY_MODES_INFO } from '../../../../utils/const/default-difficulty-modes-info';

import { StyledLocalLeaderList } from './local-leader-list.styles';

type Props = {
  mode: GameModesPaths;
};

export const LocalLeaderList = (props: Props) => {
  const { mode } = props;

  const modeData = useAppSelector(selectLocalModeData(mode));
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    const newTabsData = DEFAULT_DIFFICULTY_MODES_INFO.map((el) => {
      const { label, type } = el;
      const getLeaderListTable = () => {
        return <LeaderListTable data={modeData[type]} />;
      };

      if (modeData[type]) {
        return {
          label,
          id: type,
          component: getLeaderListTable(),
        };
      }
    }).filter((el) => el);

    setTabsData(newTabsData);
  }, [modeData]);

  return (
    <StyledLocalLeaderList>
      <Tabs tabsData={tabsData} />
    </StyledLocalLeaderList>
  );
};
