import { FC, ReactNode } from 'react';

import style from './layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => <div className={style.wrapper}>{children}</div>;

export default Layout;
