import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../assets/image/home.png';

import styles from './index.module.scss';

const ButtonGoHome: NextPage = () => (
  <Link href="/hangman">
    <button className={styles.container} type="button">
      <Image src={logo} width={60} height={60} alt="логотип игры виселица" />
    </button>
  </Link>
);

export { ButtonGoHome };
