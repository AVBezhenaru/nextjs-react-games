import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { getAppState, resetTheme } from '../../store/reducers/AppSlice';

import styles from './index.module.scss';

type ButtonProps = {
  text?: string;
};

const Button: FC<ButtonProps> = ({ text }) => {
  const { theme } = useAppSelector(getAppState);

  const onClick = () => resetTheme();

  return (
    <Link style={{ textDecoration: 'none', color: '#ffffff' }} to="/theme" onClick={onClick}>
      <button className={styles.button} type="button">
        <span className={styles.text} title={text ? undefined : 'Сменить тему'}>
          {text || `Тема: ${theme}`}
        </span>
      </button>
    </Link>
  );
};

export { Button as ButtonChangeTheme };
