import { FC, ReactNode } from 'react';

import styles from '/styles/Layout.module.scss';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export { Layout };
