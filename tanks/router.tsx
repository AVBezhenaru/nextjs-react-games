import React, { FC } from 'react';

import { useAppSelector } from '../hooks';

import styles from './index.module.scss';
import { Canvas } from './core/Canvas/Canvas';
import { EndPage } from './core/Pages/EndPage/EndPage';
import { MainPage } from './core/Pages/MainPage/MainPage';
import { VictoryPage } from './core/Pages/VictoryPage/VictoryPage';

const Router: FC = () => {
  const game = useAppSelector((state) => state.tanks);
  return game.gameStart ? (
    <div className={styles.game}>{!game.gameOver ? <Canvas /> : <EndPage />}</div>
  ) : !game.gameVictory ? (
    <MainPage />
  ) : (
    <VictoryPage />
  );
};

export default Router;
