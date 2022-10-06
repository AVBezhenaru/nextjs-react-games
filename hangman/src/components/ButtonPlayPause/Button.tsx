import React from 'react';

import PlayImg from './play.svg';
import PauseImg from './pause.svg';
import styles from './Button.module.scss';

const Pause = () => <img className={styles.pause} src={PauseImg} alt="пауза" />;
const Play = () => <img className={styles.play} src={PlayImg} alt="играть" />;

const Button = () => {
  const play = true;

  return (
    <button className={styles.button} type="button" aria-label="Кнопка паузы">
      {play === true ? <Pause /> : <Play />}
    </button>
  );
};

export default Button;
