import Board from '../../components/Board/Board';
import Header from '../../components/Header/Header';
import GameOver from '../GameOver/GameOver';
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
  const [modal, setModal] = useState(false);

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
    service.onKeyDown(e, numbers, setNumbers, score, setScore, setModal);
  };

  const onClose = () => {
    setModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <Header
        score={score}
        numbers={numbers}
        restart={() => service.restartGame(numbers, setNumbers, setScore)}
      />
      <Board numbers={numbers} />
      {modal ? (
        <GameOver
          score={score}
          onClose={onClose}
          restart={() => service.restartGame(numbers, setNumbers, setScore)}
        />
      ) : null}
    </div>
  );
};

export default Game;
