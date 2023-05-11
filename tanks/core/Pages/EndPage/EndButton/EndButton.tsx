import React, { FC, ReactElement } from 'react';

import cl from './EndButton.module.scss';

interface IProps {
  children: string;
  onClick: () => void;
}

const EndButton: FC<IProps> = ({ children, onClick }): ReactElement => (
  <button onClick={() => onClick()} className={cl.end__button}>
    {children}
  </button>
);

export default EndButton;
