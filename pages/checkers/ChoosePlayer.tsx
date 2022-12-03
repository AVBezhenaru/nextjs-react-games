import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import {
  setColor,
  setBid,
  setShow,
  setShowFirst,
  setIsCreatedPlay,
} from '../../checkers/store/checkersReducer';
import Modal from '../../checkers/components/Modal/Modal';
import Lobbi from '../../checkers/components/Lobbi/Lobbi';
import {
  players,
  colors,
  bids,
  player,
} from '../../checkers/components/Lobbi/PlayersForOnlinePlay';
import { UserProps, PlayerProps } from '../../checkers/interfaces/Interfaces';

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
  const [input, setInput] = useState('');
  const [inputForBids, setInputForBids] = useState('');
  const dispatch = useDispatch();
  const { color, bid, show } = useSelector((state: RootState) => state.checkers);
  console.log(color, bid);

  function playersFunk(bids: number, color: string) {
    const changeMyPlayer = {
      id: player.id,
      name: player.name,
      playConditional: { colorCheckers: color, bid: bids },
    };
    changeMyPlayer.playConditional.bid = Number(bid);
    changeMyPlayer.playConditional.colorCheckers = color;
    return [...players, changeMyPlayer];
  }
  return (
    <div className="closePlayer__page">
      <div>
        <ul className="lobbi-container">
          {playersFunk(bid, color)
            .filter((p) => p.playConditional.bid !== 0 && p.playConditional.colorCheckers !== '')
            .map((el: UserProps) => (
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

      <Modal onClose={() => dispatch(setShow(false))} show={show}>
        <div className="row">
          <h1 className="lobbiCreckers_header">Настройки вашей игры</h1>
          <div className="lobbiCreckers__container">
            <p className="lobbiCreckers_text">Цвет шашки</p>
            <select className="lobbiCreckers_select" onChange={(e) => setInput(e.target.value)}>
              <option>Выберите цвет шашки </option>
              {colors.map((color) => (
                <option value={color.label} key={color.label}>
                  {color.label}
                </option>
              ))}
            </select>
          </div>
          <div className="column">
            <p className="lobbiCreckers_text">Ставка</p>
            <select
              className="lobbiCreckers_select"
              onChange={(e) => setInputForBids(e.target.value)}
            >
              <option>Выбор вашей ставки </option>
              {bids.map((bid) => (
                <option key={bid.label}> {bid.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="lobbiCreckers-button__container">
          <button
            className="lobbiCreckers-button"
            type="button"
            onClick={() => {
              dispatch(setIsCreatedPlay(true));
              dispatch(setShow(false));
              dispatch(setColor(input));
              dispatch(setBid(inputForBids));
              playersFunk(bid, color);
            }}
          >
            Подтвердить
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default СhoosePlayer;
