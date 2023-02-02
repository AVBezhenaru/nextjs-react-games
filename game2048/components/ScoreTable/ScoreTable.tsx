import styles from '../ScoreTable/ScoreTable.module.scss';
import React from 'react';
import HomeButton from '../HomeButton/HomeButton';

const ScoreTable = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.homeButton}>
        <HomeButton />
      </div>
      <div className={styles.header}>Best scores</div>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.place}>1</div>
          <div className={styles.name}>Player1</div>
          <div className={styles.score}>000000</div>
        </div>
        <div className={styles.row}>
          <div className={styles.place}>2</div>
          <div className={styles.name}>Player2</div>
          <div className={styles.score}>000000</div>
        </div>
        <div className={styles.row}>
          <div className={styles.place}>3</div>
          <div className={styles.name}>Player3</div>
          <div className={styles.score}>000000</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreTable;
