import React, { FC } from 'react';

import styles from './GuessWord.module.scss';

const word = 'в сел ца';

type RenderLetterProps = {
  letter: string;
};

const RenderLetter: FC<RenderLetterProps> = ({ letter }) => (
  <span className={styles.letter}>{letter}</span>
);

const GuessWord: FC = () => (
  <div className={styles.container}>
    {word.split('').map((letter, index) => (
      <RenderLetter key={index} letter={letter} />
    ))}
  </div>
);

export default GuessWord;

/**
 * будет строка со словом
 * разбиваю на массив
 * делаю массив пустых строк с длиной как у слова
 * перебираю и рендерю как есть
 * если отгадывается буква, то по индексам вставляю все совпадения в массив
 */
