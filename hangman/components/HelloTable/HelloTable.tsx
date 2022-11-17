import { NextPage } from 'next';

import { ButtonChangeTheme } from '..';

import styles from './index.module.scss';

const HelloTable: NextPage = () => (
  <div className={styles.main}>
    <h2 className={styles.title}>Приветственный экран</h2>

    <ButtonChangeTheme text="играть" />
  </div>
);

export default HelloTable;
