import Board from '../../components/Board/Board';
import Header from '../../components/Header/Header';
import styles from '../Game/Game.module.scss';
import React, { useEffect, useState } from 'react';
import Service from '../../service/service';

let service = new Service();

const Game = () => {
  const [numbers, setNumbers] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [score, setScore] = useState(0);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    let firstRandomNumber = service.generateNumber(numbers);
    let secondRandomNumber = service.generateNumber(firstRandomNumber);
    setNumbers(secondRandomNumber);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    service.onKeyDown(e, numbers, setNumbers, score, setScore);
  };

  return (
    <div className={styles.wrapper}>
      <Header
        score={score}
        numbers={numbers}
        restart={() => service.restartGame(numbers, setNumbers, setScore)}
      />
      <Board numbers={numbers} />
    </div>
  );
};

export default Game;
