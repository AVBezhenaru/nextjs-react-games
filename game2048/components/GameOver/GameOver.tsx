import styles from '../GameOver/GameOver.module.scss';
import classes from '../MainPage/ButtonsStyle.module.scss';
import React from 'react';
import Link from 'next/link';

interface GameOverProps {
  onClose: () => void;
  restart: () => void;
  score: number;
}

const GameOver = (props: GameOverProps) => {
  const startNewGame = () => {
    props.restart();
    props.onClose();
  };

  return (
    <div className={styles.overlay} onClick={() => props.onClose()}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.heading}>GAME IS OVER!</div>
        <div className={styles.info}>Your score: {props.score} </div>
        <div className={styles.buttons}>
          {/* <Link href="/profile/games/game2048/game" passHref> */}
          <button className={classes.btn} onClick={() => startNewGame()}>
            <span className={classes.shadow}></span>
            <span className={classes.depth}></span>
            <span className={classes.content}>PLAY AGAIN</span>
          </button>
          {/* </Link> */}

          <Link href="/profile/games/game2048" passHref>
            <button className={classes.btn}>
              <span className={classes.shadow}></span>
              <span className={classes.depth}></span>
              <span className={classes.content}>MENU</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
