import { FC, ReactNode } from 'react';

import { ButtonGoHome } from '../ButtonGoHome/ButtonGoHome';
import styles from '../../styles/Header.module.scss';

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => (
  <div className={styles.header}>
    <div className={styles.container}>
      <ButtonGoHome />
      {children}
    </div>
  </div>
);

export { Header };
