import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo from './home.png';
import styles from '../../styles/ButtonGoHome.module.scss';

const ButtonGoHome = () => (
  <Link href="/">
    <button className={styles.container} type="button">
      <Image src={logo} width={60} height={60} alt="логотип игры виселица" />
    </button>
  </Link>
);

export { ButtonGoHome };
