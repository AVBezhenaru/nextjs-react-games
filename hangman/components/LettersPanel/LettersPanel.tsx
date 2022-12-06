import { MouseEvent } from 'react';
import classNames from 'classnames';
import { NextPage } from 'next';

import { alphabet } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  addLetterAtCurrentWord,
  addSuccessLetter,
  addWrongLetter,
  getAppState,
} from '../../store/HangmanSlice';

import styles from './index.module.scss';

const LettersPanel: NextPage = () => {
  const dispatch = useAppDispatch();
  const { wrongLetters, successLetters, guessWord } = useAppSelector(getAppState);

  return (
    <div className={styles.container}>
      {alphabet.map((letterAlphabet) => {
        const hasInWrong = wrongLetters.includes(letterAlphabet);
        const hasInSuccess = successLetters.includes(letterAlphabet);

        const letterStyle = classNames({
          [styles.default]: true,
          [styles.wrong]: hasInWrong,
          [styles.success]: hasInSuccess,
        });

        const handleFindLetter = ({ target }: MouseEvent) => {
          const selectLetter = (target as HTMLSpanElement).textContent;

          guessWord.forEach((guessLetter: any, index: number) => {
            if (guessLetter === selectLetter) {
              //* open new letter in GuessWord
              dispatch(addLetterAtCurrentWord({ index, letter: guessLetter }));

              if (!successLetters.includes(guessLetter)) {
                dispatch(addSuccessLetter(guessLetter));
              }
            }
          });

          if (selectLetter) {
            if (!guessWord.includes(selectLetter) && !wrongLetters.includes(selectLetter)) {
              dispatch(addWrongLetter(selectLetter));
            }
          }
        };

        //* remove handler after use
        const onClick = hasInWrong || hasInSuccess ? undefined : handleFindLetter;

        return (
          <span className={letterStyle} key={letterAlphabet} onClick={onClick}>
            {letterAlphabet}
          </span>
        );
      })}
    </div>
  );
};

export { LettersPanel };
