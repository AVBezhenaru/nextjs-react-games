import { FC, ReactNode } from 'react';

import styles from '/styles/Main.module.scss';

type MainProps = {
  children: ReactNode;
};

const Main: FC<MainProps> = ({ children }) => <div className={styles.main}>{children}</div>;

export { Main };
