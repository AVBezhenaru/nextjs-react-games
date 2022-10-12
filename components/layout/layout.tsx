import { FC, ReactNode } from 'react';

import style from './layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={style.wrapper}>
    <div className={style.container}>{children}</div>
  </div>
);

export default Layout;
