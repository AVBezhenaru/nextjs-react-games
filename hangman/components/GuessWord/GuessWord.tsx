import { FC } from 'react';

import { useAppSelector } from '../../hooks';
import { getAppState } from '../../store/reducers/AppSlice';

import styles from '/styles/GuessWord.module.scss';

type RenderLetterProps = {
  letter: string;
};

const RenderLetter: FC<RenderLetterProps> = ({ letter }) => (
  <span className={styles.letter}>{letter}</span>
);

const GuessWord: FC = () => {
  const { currentWord } = useAppSelector(getAppState);

  return (
    <div className={styles.container}>
      {currentWord.map((letter, index) => (
        <RenderLetter key={index} letter={letter as string} />
      ))}
    </div>
  );
};

export { GuessWord };
