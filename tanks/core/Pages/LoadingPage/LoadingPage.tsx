import React, { type FC, ReactElement } from 'react';

import cl from './LoadingPage.module.scss';

interface IProps {
  title: string;
}

const LoadingPage: FC<IProps> = ({ title }): ReactElement => (
  <div className={cl.loading__page} data-testid="tanks-main-page">
    <h1 className={cl.loading__pageTitle}>{title}</h1>
  </div>
);

export { LoadingPage };
