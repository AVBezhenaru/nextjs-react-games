import React from 'react';
import { Link } from 'react-router-dom';

import logo from './home.png';
import styles from './index.module.scss';

const ButtonGoHome = () => (
  <Link to="/">
    <button className={styles.container} type="button">
      <img src={logo} width={60} height={60} alt="логотип игры виселица" />
    </button>
  </Link>
);

export { ButtonGoHome };
