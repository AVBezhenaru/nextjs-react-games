import { gameModesData } from '../../modes/game-modes-data';
import { LinkToMode } from '../link-to-mode/link-to-mode';

import { StyledGame } from './lobby.styles';

export const Lobby = () => {
  const modeCards = gameModesData.map((data, i) => (
    <LinkToMode {...data} key={`${data.path}_${i}`} />
  ));

  return <StyledGame>{modeCards}</StyledGame>;
};
