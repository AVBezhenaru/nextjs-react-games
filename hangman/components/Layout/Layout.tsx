import { NextPage } from 'next';
import { ReactNode } from 'react';

import { HangmanHead } from '..';

import styles from './index.module.scss';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: NextPage<ILayoutProps> = ({ children }) => (
  <>
    <HangmanHead />

    <div className={styles.container}>{children}</div>
  </>
);

export { Layout };
