import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.png';
import styles from './index.module.scss';

const ButtonBack = () => (
  <Link to="/">
    <button className={styles.container} type="button">
      <img src={logo} width={70} height={50} alt="логотип игры виселица" />
    </button>
  </Link>
);

export { ButtonBack };
