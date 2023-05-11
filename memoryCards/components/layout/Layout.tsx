import { NextPage } from 'next';
import { ReactNode } from 'react';

import styles from '../../styles/index.module.scss';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: NextPage<ILayoutProps> = ({ children }) => (
  <div className={styles.layout}>
    <h1 className={styles.title}>Memory Cards</h1>
    <main>{children}</main>
  </div>
);

export default Layout;
