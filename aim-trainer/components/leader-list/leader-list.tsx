import { GameModesPaths } from '../../utils/enums/game-modes-paths';
import { useAppSelector } from '../../../hooks';
import { selectLocalModeData } from '../../reducers/leader-list-slice';

import { LocalLeaderList } from './components/local-leader-list/local-leader-list';

type Props = {
  mode: GameModesPaths;
};

export const LeaderList = (props: Props) => {
  const { mode } = props;
  const modeData = useAppSelector(selectLocalModeData(mode));

  if (!Object.keys(modeData).length) {
    return null;
  }

  return (
    <>
      <h2>Top 10 Results</h2>
      <LocalLeaderList mode={mode} />
    </>
  );
};
