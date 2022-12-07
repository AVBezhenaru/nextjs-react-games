import { NextPage } from 'next';
import { Key } from 'react';

import { useAppSelector } from '../../../hooks';
import { getAppState } from '../../store/HangmanSlice';

import styles from './index.module.scss';

interface RenderLetterProps {
  letter: string;
}

const RenderLetter: NextPage<RenderLetterProps> = ({ letter }) => (
  <span className={styles.letter}>{letter}</span>
);

const GuessWord: NextPage = () => {
  const { currentWord } = useAppSelector(getAppState);

  return (
    <div className={styles.container}>
      {currentWord.map((letter: string, index: Key) => (
        <RenderLetter key={index} letter={letter as string} />
      ))}
    </div>
  );
};

export { GuessWord };
