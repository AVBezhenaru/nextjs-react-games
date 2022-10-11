import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addSuccessLetter,
  addWrongLetter,
  addLetterAtCurrentWord,
  getAppState,
} from '../../store/reducers/AppSlice';
import { AlphabetLetters } from '../../types/AppSlice';
import { alphabet } from '../../utils/alphabet';

import styles from './index.module.scss';

const LettersPanel: FC = () => {
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

          guessWord.forEach((guessLetter, index) => {
            if (guessLetter === selectLetter) {
              //* open new letter in GuessWord
              dispatch(addLetterAtCurrentWord({ index, letter: guessLetter }));

              if (!successLetters.includes(guessLetter)) {
                dispatch(addSuccessLetter(guessLetter));
              }
            }
          });

          if (
            !guessWord.includes(selectLetter as AlphabetLetters) &&
            !wrongLetters.includes(selectLetter as AlphabetLetters)
          ) {
            dispatch(addWrongLetter(selectLetter as AlphabetLetters));
          }
        };

        //* remove handler after use
        const onClick = hasInWrong || hasInSuccess ? undefined : handleFindLetter;

        return (
          <span className={letterStyle} key={letterAlphabet as string} onClick={onClick}>
            {letterAlphabet as string}
          </span>
        );
      })}
    </div>
  );
};

export { LettersPanel };
