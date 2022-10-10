import React, { FC, ReactNode } from 'react';

import { ButtonBack } from '../ButtonBack';

import styles from './index.module.scss';

type HeaderProps = {
  children: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => (
  <div className={styles.header}>
    <div className={styles.container}>
      <ButtonBack />
      {children}
    </div>
  </div>
);

export { Header };
