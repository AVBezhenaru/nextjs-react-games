import React, { FC } from 'react';

import styles from './Button.module.scss';

const Button: FC = () => (
  <button className={styles.button} type="button">
    <span className={styles.text} title="Сменить тему">
      Тема: Игры
    </span>
  </button>
);

export default Button;
