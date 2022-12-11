import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../store';
import { setShow, setShowFirst } from '../../../../checkers/store/checkersReducer';
import Lobbi from '../../../../checkers/components/Lobbi/Lobbi';
import { players, player } from '../../../../checkers/components/Lobbi/PlayersForOnlinePlay';
import { UserProps, PlayerProps } from '../../../../checkers/interfaces/Interfaces';
import ModalCreateGame from '../../../../checkers/components/Modal/ModalCreateGame';

interface ColorProps {
  label: string;
  value: string;
}
interface СhoosePlayerProps {
  colors: ColorProps;
  players: UserProps[];
  playerForgameMe: PlayerProps;
  restart: () => void;
}
const СhoosePlayer: FC<СhoosePlayerProps> = () => {
  const dispatch = useDispatch();
  const { color, bid } = useSelector((state: RootState) => state.checkers);
  // console.log(color, bid);

  const playersFunk = (bids: number, color: string) => {
    const changeMyPlayer = {
      id: player.id,
      name: player.name,
      playConditional: { colorCheckers: color, bid: bids },
    };
    changeMyPlayer.playConditional.bid = Number(bid);
    changeMyPlayer.playConditional.colorCheckers = color;
    return [...players, changeMyPlayer];
  };
  const playersFunkFilter = () =>
    playersFunk(bid, color).filter(
      (p) => p.playConditional.bid !== 0 && p.playConditional.colorCheckers !== '',
    );

  return (
    <div className="closePlayer__page">
      <div>
        <ul className="lobbi-container">
          {playersFunkFilter().map((el: UserProps) => (
            <Lobbi key={el.id} {...el} />
          ))}
        </ul>
        <button
          type="button"
          className="lobbiCreckers__modal-button"
          onClick={() => {
            dispatch(setShow(true));
            dispatch(setShowFirst(false));
          }}
        >
          Создать игру
        </button>
      </div>
      <ModalCreateGame playersFunk={playersFunk} />
    </div>
  );
};
export default СhoosePlayer;
