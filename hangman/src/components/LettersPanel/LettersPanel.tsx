import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './LettersPanel.module.scss';

const alphabet = [
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ъ',
  'ы',
  'ь',
  'э',
  'ю',
  'я',
];

const wrong = ['д', 'р', 'ш', 'к'];
const success = ['а', 'в', 'у', 'л', 'с', 'ц'];

const LettersPanel: FC = () => (
  <div className={styles.container}>
    {alphabet.map((letter) => {
      const letterStyle = classNames({
        [styles.default]: true,
        [styles.wrong]: wrong.includes(letter),
        [styles.success]: success.includes(letter),
      });

      return (
        <span key={letter} className={letterStyle}>
          {letter}
        </span>
      );
    })}
  </div>
);

export default LettersPanel;
