import React, { FC } from 'react';

import WinGif from './win.gif';
import LoseGif from './lose.gif';
import styles from './index.module.scss';

interface StatusGameMessageProps {
  status: 'win' | 'lose' | null;
  onClose: React.Dispatch<React.SetStateAction<'win' | 'lose' | null>>;
}

const StatusGameMessage: FC<StatusGameMessageProps> = ({ status, onClose }) => {
  const winMessage = 'урааа победа!!!🎉🎉🎉';
  const loseMessage = 'проиграно 👻👻👻';

  const title = status === 'win' ? winMessage : loseMessage;
  const srcImg = status === 'win' ? WinGif : LoseGif;

  const onClick = () => onClose(null);

  return (
    status && (
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <img className={styles.image} src={srcImg} alt={title} />

        <button className={styles.button} type="button" onClick={onClick}>
          x
        </button>
      </div>
    )
  );
};

export { StatusGameMessage };
