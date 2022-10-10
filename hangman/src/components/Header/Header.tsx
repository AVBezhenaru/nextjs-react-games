import React, { FC, ReactNode } from 'react';

import styles from './Header.module.scss';

type HeaderProps = {
  children: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => (
  <div className={styles.header}>
    <div className={styles.container}>{children}</div>
  </div>
);

export { Header };
