import { ReactNode } from 'react';
import { NextPage } from 'next';

import { ButtonGoHome } from '..';

import styles from './index.module.scss';

interface HeaderProps {
  children: ReactNode;
}

const Header: NextPage<HeaderProps> = ({ children }) => (
  <div className={styles.header}>
    <div className={styles.container}>
      <ButtonGoHome />
      {children}
    </div>
  </div>
);

export { Header };
