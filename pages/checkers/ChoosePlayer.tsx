import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { setColor } from '../../checkers/store/checkersReducer';
import Modal from '../../checkers/components/Modal/Modal';
import Lobbi from '../../checkers/components/Lobbi/Lobbi';
import { players, colors } from '../../checkers/components/Lobbi/PlayersForOnlinePlay';

interface PlayConditional {
  colorCheckers: string | number;

  bid: number;
}
interface UserProps {
  id: number;
  name: string;
  playConditional: PlayConditional;
}
interface ColorProps {
  label: string;
  value: string;
}
interface СhoosePlayerProps {
  show: boolean;
  setShow: (show: boolean) => void;
  colors: ColorProps;
  players: UserProps[];
}
const СhoosePlayer: FC<СhoosePlayerProps> = () => {
  const [, setShowFirst] = useState(true);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.checkers.color);
  console.log(count);

  return (
    <div className="closePlayer__page">
      <div>
        <ul className="lobbi-container">
          {players.map((el) => (
            <Lobbi key={el.id} {...el} />
          ))}
        </ul>
        <button
          type="button"
          className="lobbiCreckers__modal-button"
          onClick={() => {
            setShow(true);
            setShowFirst(false);
          }}
        >
          Создать игру
        </button>
      </div>

      <Modal onClose={() => setShow(false)} show={show}>
        <div className="row">
          <h1 className="lobbiCreckers_header">Настройки вашей игры</h1>
          <div className="lobbiCreckers__container">
            <p className="lobbiCreckers_text">Цвет шашки</p>
            <select className="lobbiCreckers_select" onChange={(e) => setInput(e.target.value)}>
              <option>Выберите цвет шашки </option>
              <option value={colors[0].label}>&#9899;</option>
              <option value={colors[1].label}>&#9898;</option>
            </select>
          </div>
          <div className="column">
            <p className="lobbiCreckers_text">Ставка</p>
            <select className="lobbiCreckers_select">
              <option>Выбор вашей ставки </option>
              <option>10</option>
              <option>50</option>
              <option>100</option>
              <option>1000</option>
              <option>2000</option>
              <option>5000</option>
              <option>10.000</option>
            </select>
          </div>
        </div>
        <div className="lobbiCreckers-button__container">
          <button
            className="lobbiCreckers-button"
            type="button"
            onClick={() => {
              setShow(false);
              dispatch(setColor(input));
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
