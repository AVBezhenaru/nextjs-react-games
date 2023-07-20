import React, { FC } from 'react';

import MyButton from '../MyButton/MyButton';

import cl from './Modal.module.css';

interface ModalProps {
  points: number;
  resetGame: () => void;
}

const Modal: FC<ModalProps> = ({ points, resetGame }) => (
  <div className={cl.modal}>
    <div>
      <h1>Game Over!</h1>
      <p className={cl.lastScore}>Вы набрали: {points}!</p>
      <p className={cl.lastScore}>Попробуй еще?</p>

      <MyButton modal onClick={resetGame}>
        Сначала
      </MyButton>
    </div>
  </div>
);

export default Modal;
