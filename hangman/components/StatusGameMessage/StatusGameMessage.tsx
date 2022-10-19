import React, { FC, MouseEvent } from 'react';

import { StatusGame } from '../../types/AppSlice';
import { useAppSelector } from '../../hooks';
import { getAppState } from '../../store/reducers/AppSlice';

import WinGif from './win.gif';
import LoseGif from './lose.gif';
import Image from 'next/image';

import styles from '../../styles/StatusGameMessage.module.scss';

interface StatusGameMessageProps {
  status: StatusGame;
  setStatusGame: React.Dispatch<React.SetStateAction<StatusGame>>;
}

const StatusGameMessage: FC<StatusGameMessageProps> = ({ status, setStatusGame }) => {
  const { guessWord, successLetters, wrongLetters } = useAppSelector(getAppState);

  const winMessage = 'урааа победа!!!🎉🎉🎉';
  const loseMessage = 'проиграно 👻👻👻';

  const title = status === 'win' ? winMessage : loseMessage;
  const srcImg = status === 'win' ? WinGif : LoseGif;

  const onClick = ({ target }: MouseEvent) => {
    const isOverlay = (target as HTMLDivElement).classList.contains(styles.overlay);
    const isCloseButton = (target as HTMLButtonElement).classList.contains(styles.button);

    if (isOverlay || isCloseButton) setStatusGame('loading');
  };

  const isShowOverlay = status === 'win' || status === 'lose' ? true : null;

  return (
    isShowOverlay && (
      <div className={styles.overlay} onClick={onClick}>
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.stats}>
            <p className={styles.statsField}>
              Загаданное слово:{' '}
              <span className={`${styles.span} ${styles.word}`}>{guessWord.join('')}</span>
            </p>
            <p className={styles.statsField}>
              Открыто букв:{' '}
              <span className={`${styles.span} ${styles.success}`}>{successLetters.length}</span>
            </p>
            <p className={styles.statsField}>
              Неправильно угадано букв:{' '}
              <span className={`${styles.span} ${styles.wrong}`}>{wrongLetters.length}</span>
            </p>
          </div>

          <Image className={styles.image} src={srcImg} alt={title} />

          <button className={styles.button} type="button">
            x
          </button>
        </div>
      </div>
    )
  );
};

export { StatusGameMessage };
