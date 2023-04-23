import React, { FC, ReactElement } from 'react';
import Image from 'next/image';

import { MainButton } from '../MainPage/MainButton/MainButton';

import cl from './EndPage.module.scss';

const EndPage: FC = (): ReactElement => {
  const buttonFuncExit = (): void => {
    location.reload();
  };

  return (
    <div className={cl.end__page}>
      <Image
        className={cl.end__image}
        src="/battle-city-game-over-dendy.jpg"
        alt=""
        width={912}
        height={736}
        priority
      />
      <MainButton func={buttonFuncExit}>Назад</MainButton>
    </div>
  );
};

export { EndPage };
