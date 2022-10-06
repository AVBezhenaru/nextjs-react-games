import React from 'react';

import styles from './Button.module.scss';

const Button = () => (
  <button className={styles.button} type="button">
    <span className={styles.text} title="Сменить тему">
      Тема: Игры
    </span>
  </button>
);

export default Button;
