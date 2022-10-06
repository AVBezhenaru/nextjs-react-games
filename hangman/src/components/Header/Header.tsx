import React, { FC, ReactNode } from 'react';

import styles from './Header.module.scss';

type HeaderProps = {
  children: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => (
  <div className={styles.header}>
    <div className={styles.buttonContainer}>{children}</div>
  </div>
);

export default Header;
