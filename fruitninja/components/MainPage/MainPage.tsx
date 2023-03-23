import React from 'react';
import Link from 'next/link';

import styles from './MainPage.module.scss';

const MainPage = () => (
  <div className={styles.wrapper}>
    <div className={styles.info}>
      <div className={styles.container}>
        <div className={styles.heading}>Fruit</div>
        <div className={styles.headingNinja} />
      </div>
      <h3 className={styles.header}>How to play?</h3>
    </div>
    <div className={styles.buttons}>
      <Link href="./fruitninja/game">
        <button type="button" className={styles.btn}>
          <div className={styles.content} />
        </button>
      </Link>
    </div>
  </div>
);

export default MainPage;
