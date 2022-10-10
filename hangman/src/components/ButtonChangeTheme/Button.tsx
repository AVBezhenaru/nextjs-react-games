import React, { FC } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  theme: string;
};

const Button: FC<ButtonProps> = ({ theme }) => (
  <button className={styles.button} type="button">
    <span className={styles.text} title="Сменить тему">
      Тема: {theme}
    </span>
  </button>
);

export default Button;
