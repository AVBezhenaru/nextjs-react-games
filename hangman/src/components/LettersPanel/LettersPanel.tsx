import React, { FC } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { findLetterInGuessWord, getAppState } from '../../store/reducers/AppSlice';
import { alphabet } from '../../data/data';

import styles from './LettersPanel.module.scss';

const LettersPanel: FC = () => {
  const dispatch = useAppDispatch();
  const { wrongLetters, successLetters } = useAppSelector(getAppState);

  return (
    <div className={styles.container}>
      {alphabet.map((letter) => {
        const hasInWrong = wrongLetters.includes(letter);
        const hasInSuccess = successLetters.includes(letter);

        const letterStyle = classNames({
          [styles.default]: true,
          [styles.wrong]: hasInWrong,
          [styles.success]: hasInSuccess,
        });

        const onClick =
          hasInWrong || hasInSuccess ? undefined : () => dispatch(findLetterInGuessWord(letter));

        return (
          <span className={letterStyle} key={letter as string} onClick={onClick}>
            {letter as string}
          </span>
        );
      })}
    </div>
  );
};

export { LettersPanel };
