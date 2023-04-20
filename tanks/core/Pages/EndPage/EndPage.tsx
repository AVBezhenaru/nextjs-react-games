import React, { FC, ReactElement } from 'react';

import background from '../../../assets/images/battle-city-game-over-dendy.jpg';
import MainButton from '../MainPage/MainButton/MainButton';

import cl from './EndPage.module.scss';

const EndPage: FC = (): ReactElement => {
  const buttonFuncExit = (): void => {
    location.reload();
  };

  return (
    <div className={cl.end__page}>
      <img className={cl.end__image} src={background.src} alt="" />
      <MainButton func={buttonFuncExit}>Назад</MainButton>
    </div>
  );
};

export default EndPage;
