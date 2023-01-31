import styles from '../MainPage/MainPage.module.scss';
import React from 'react';
import Link from 'next/link';

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h2 className={styles.heading}>2048</h2>
        <h3 className={styles.header}>How to play?</h3>
        <div className={styles.instructions}>
          Use your arrow keys to move the tiles. Tiles with the same number merge into one when they
          touch. Add them up to reach 2048!
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button}>
          <Link href="./game2048/game">PLAY</Link>
        </button>
        <button className={styles.button}>
          <Link href="./game2048/settings">SETTINGS</Link>
        </button>
        <button className={styles.button}>
          <Link href="./game2048/score-table">SCORES</Link>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
