import React, { FC } from 'react';

import styles from './index.module.scss';

type ButtonProps = {
  text: string;
};

const Button: FC<ButtonProps> = ({ text }) => (
  <button className={styles.button} type="button">
    <span className={styles.text} title="Сменить тему">
      {text}
    </span>
  </button>
);

export { Button as ButtonChangeTheme };
