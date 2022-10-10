import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './index.module.scss';

const Layout: FC = () => (
  <div className={styles.container}>
    <Outlet />
  </div>
);

export { Layout };
