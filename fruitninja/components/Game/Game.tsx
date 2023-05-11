import React, { useState } from 'react';

import Board from '../Board/Board';
import Header from '../Header/Header';

import styles from './Game.module.scss';

const Game = () => {
  const [score, setScore] = useState<number>(0);

  const handleFruitSliced = (): void => {
    setScore(score + 1);
  };

  return (
    <div className={styles.wrapper}>
      <Header score={score} />
      <Board onFruitSliced={handleFruitSliced} score={score} />
    </div>
  );
};

export default Game;
