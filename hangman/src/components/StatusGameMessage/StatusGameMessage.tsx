import React, { FC, MouseEvent } from 'react';

import { StatusGame } from '../../types/AppSlice';

import WinGif from './win.gif';
import LoseGif from './lose.gif';
import styles from './index.module.scss';

interface StatusGameMessageProps {
  status: StatusGame;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGame>>;
}

const StatusGameMessage: FC<StatusGameMessageProps> = ({ status, setStatusGame }) => {
  const winMessage = 'урааа победа!!!🎉🎉🎉';
  const loseMessage = 'проиграно 👻👻👻';

  const title = status === 'win' ? winMessage : loseMessage;
  const srcImg = status === 'win' ? WinGif : LoseGif;

  const onClick = ({ target }: MouseEvent) => {
    const isOverlay = (target as HTMLDivElement).classList.contains(styles.overlay);
    const isCloseButton = (target as HTMLButtonElement).classList.contains(styles.button);

    if (isOverlay || isCloseButton) setStatusGame('idle');
  };

  const isShowOverlay = status === 'win' || status === 'lose' ? true : null;

  return (
    isShowOverlay && (
      <div className={styles.overlay} onClick={onClick}>
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <img className={styles.image} src={srcImg} alt={title} />

          <button className={styles.button} type="button">
            x
          </button>
        </div>
      </div>
    )
  );
};

export { StatusGameMessage };
