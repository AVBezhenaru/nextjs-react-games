import React, { FC } from 'react';

import { GAME_COLORS } from '../../variables/variables';

import cl from './Header.module.css';

interface HeaderProps {
  points: number;
  showStartButton: boolean;
}

const Header: FC<HeaderProps> = ({ points, showStartButton }) => (
  <div className={cl.header}>
    <h1>Змейка</h1>
    <p className={cl.paragraph}>
      Вы <span style={{ color: GAME_COLORS.snakeHead }}>Змейка</span>!
    </p>
    <p className={cl.paragraph}>
      Постарайтесь съесть как можно больше
      <span style={{ color: GAME_COLORS.apple }}> яблок </span>и не ешьте
      <span style={{ color: GAME_COLORS.bombs }}> отраву </span>!
    </p>

    {showStartButton && <h2>Удачи!</h2>}
    {!showStartButton && (
      <h2 className={cl.secondTitle}>
        Очки: <span style={{ color: 'white' }}>{points}</span>
      </h2>
    )}
  </div>
);

export default Header;
