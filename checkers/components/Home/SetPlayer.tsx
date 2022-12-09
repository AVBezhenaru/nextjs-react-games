import { useSelector, useDispatch } from 'react-redux';

import { setColor } from '../../store/checkersReducer';
import { RootState } from '../../../store';
import { Player } from '../../model/Player';
import { players, player } from '../Lobbi/PlayersForOnlinePlay';
import { Colors } from '../../model/Colors';

export const SetPlayer = () => {
  const dispatch = useDispatch();
  const { isPlayWithBoot, idForPlayersOnline, color, bid } = useSelector(
    (state: RootState) => state.checkers,
  );
  const blackAndWhitePlayers = [];
  let colorForMyUser;
  let bids;
  if (!isPlayWithBoot) {
    const selectedPlayer = players.find((p) => p.id === idForPlayersOnline);

    blackAndWhitePlayers.push(
      new Player(
        selectedPlayer?.id,

        selectedPlayer?.name,
        selectedPlayer?.playConditional.bid,

        selectedPlayer?.playConditional.colorCheckers,
      ),
    );

    if (selectedPlayer?.playConditional.colorCheckers === color) {
      if (selectedPlayer?.playConditional.colorCheckers === 'black') {
        colorForMyUser = Colors.WHITE;
      } else {
        colorForMyUser = Colors.BLACK;
      }
    } else {
      colorForMyUser = color;
    }
    if (selectedPlayer?.playConditional.bid !== bid) {
      bids = selectedPlayer?.playConditional.bid;
    }

    blackAndWhitePlayers.push(new Player(player.id, player.name, bids, colorForMyUser));

    dispatch(setColor(colorForMyUser));

    return blackAndWhitePlayers;
  }
  const WHITE_BOT_NAME = 'Белого Игрока';
  const BLACK_BOT_NAME = 'Черного Игрока';
  blackAndWhitePlayers.push(new Player(null, WHITE_BOT_NAME, null, Colors.WHITE));
  blackAndWhitePlayers.push(new Player(null, BLACK_BOT_NAME, null, Colors.BLACK));
  return blackAndWhitePlayers;
};
