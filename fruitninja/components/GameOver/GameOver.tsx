import React from 'react';
import Link from 'next/link';

import styles from './GameOver.module.scss';

interface GameOverProps {
  score: number;
}

const GameOver = ({ score }: GameOverProps) => (
  <div className={styles.overlay}>
    <div className={styles.wrapper}>
      <div className={styles.heading} />
      <div className={styles.info}>Your score: {score} </div>
      <div className={styles.buttons}>
        <Link href="/profile/games/fruitninja" passHref>
          <button type="button" className={styles.glow}>
            MENU
          </button>
        </Link>
      </div>
    </div>
  </div>
);
export default GameOver;
