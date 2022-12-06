import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { setColor, setBid, setShow, setIsCreatedPlay } from '../../store/checkersReducer';
import { colors, bids } from '../Lobbi/PlayersForOnlinePlay';

import Modal from './Modal';

interface PlayersFunkProps {
  playersFunk(bid: number, color: string): void;
}
const ModalCreateGame: FC<PlayersFunkProps> = ({ playersFunk }) => {
  const [input, setInput] = useState('');
  const [inputForBids, setInputForBids] = useState('');
  const dispatch = useDispatch();
  const { show, color, bid } = useSelector((state: RootState) => state.checkers);
  return (
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
  );
};

export default ModalCreateGame;
