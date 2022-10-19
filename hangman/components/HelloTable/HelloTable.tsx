import React from 'react';

import { ButtonChangeTheme } from '../ButtonChangeTheme/ButtonChangeTheme';

import styles from '../../styles/HelloTable.module.scss';

const HelloTable = () => {
  return (
    <div className={styles.main}>
      <h2 className={styles.title} style={{ fontSize: '5rem' }}>
        Приветственный экран
      </h2>

      <ButtonChangeTheme text="играть" />
    </div>
  );
};

export default HelloTable;
