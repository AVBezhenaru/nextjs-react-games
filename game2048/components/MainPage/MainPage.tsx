import styles from '../MainPage/MainPage.module.scss';
import classes from '../MainPage/ButtonsStyle.module.scss';

import React from 'react';
import Link from 'next/link';

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.container}>
          <div className={styles.heading}>2048</div>
        </div>
        <h3 className={styles.header}>How to play?</h3>
        <div className={styles.instructions}>
          Use your arrow keys to move the tiles. Tiles with the same number merge into one when they
          touch. Add them up to reach 2048!
        </div>
      </div>
      <div className={styles.buttons}>
        <Link href="./game2048/game">
          <button className={classes.btn}>
            <span className={classes.shadow}></span>
            <span className={classes.depth}></span>
            <span className={classes.content}>PLAY</span>
          </button>
        </Link>
        <Link href="./game2048/settings">
          <button className={classes.btn}>
            <span className={classes.shadow}></span>
            <span className={classes.depth}></span>
            <span className={classes.content}>SETTINGS</span>
          </button>
        </Link>
        <Link href="./game2048/score-table">
          <button className={classes.btn}>
            <span className={classes.shadow}></span>
            <span className={classes.depth}></span>
            <span className={classes.content}>SCORES</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
