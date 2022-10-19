import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import styles from '../../styles/ButtonGoHome.module.scss';

import logo from './home.png';

const ButtonGoHome: FC = () => (
  <Link href="/">
    <button className={styles.container} type="button">
      <Image src={logo} width={60} height={60} alt="логотип игры виселица" />
    </button>
  </Link>
);

export { ButtonGoHome };
