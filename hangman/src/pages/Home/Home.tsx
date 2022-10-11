import React from 'react';

import { ButtonChangeTheme } from '../../components';

import styles from './index.module.scss';

const Home = () => (
  <div className={styles.container}>
    <div className={styles.main}>
      <h2 className={styles.title}>Приветственный экран</h2>

      <ButtonChangeTheme text="играть" />
    </div>
  </div>
);

export { Home };
