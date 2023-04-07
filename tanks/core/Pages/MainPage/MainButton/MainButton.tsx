import React, { type FC, ReactElement } from 'react';

import cl from './MainButton.module.scss';

interface IProps {
  children: string;
  func?: () => void;
}

const MainButton: FC<IProps> = ({ children, func }): ReactElement => (
  // eslint-disable-next-line react/button-has-type
  <button onClick={() => func()} className={cl.main__button}>
    {children}
  </button>
);

export default MainButton;
