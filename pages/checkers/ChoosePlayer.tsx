import React, { FC, useState } from 'react';

import Modal from '../../checkers/components/Modal/Modal';
import Lobbi from '../../checkers/components/Lobbi/Lobbi';

interface СhoosePlayerProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
const СhoosePlayer: FC<СhoosePlayerProps> = () => {
  const [, setShowFirst] = useState(true);
  const [show, setShow] = useState(false);

  return (
    <div className="closePlayer__page">
      <Lobbi name="" playConditional={undefined} />
      <div className="lobbiCreckers-button__container">
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
            <p className="lobbiCreckers_text">Имя</p>
            <input className="lobbiCreckers_select" type="text" />
            <p className="lobbiCreckers_text">Цвет шашки</p>
            <select className="lobbiCreckers_select">
              <option>Выберите цвет шашки </option>
              <option value="Белая шашка">&#9898;</option>
              <option value="Черная шашка">&#9899;</option>
            </select>
          </div>
          <div className="column">
            <p className="lobbiCreckers_text">Донаты</p>
            <select className="lobbiCreckers_select">
              <option>Выбор размера донат </option>
              <option value="хз">100р</option>
              <option value="хз">500р</option>
              <option value="хз">1000р</option>
            </select>
          </div>
        </div>
        <div className="lobbiCreckers-button__container">
          <button className="lobbiCreckers-button" type="button" onClick={() => setShow(false)}>
            Выбрать игрока
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default СhoosePlayer;
