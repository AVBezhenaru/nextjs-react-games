import { NextPage } from 'next';
import { ReactNode } from 'react';

import styles from './index.module.scss';

type MainProps = {
  children: ReactNode;
};

const Main: NextPage<MainProps> = ({ children }) => <div className={styles.main}>{children}</div>;

export { Main };
