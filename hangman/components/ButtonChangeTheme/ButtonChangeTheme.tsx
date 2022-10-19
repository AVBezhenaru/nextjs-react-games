import Link from 'next/link';
import { FC } from 'react';

import { useAppSelector } from '../../hooks';
import { getAppState, resetTheme } from '../../store/reducers/AppSlice';
import styles from '../../styles/ButtonChangeTheme.module.scss';

type ButtonProps = {
  text?: string;
};

const Button: FC<ButtonProps> = ({ text }) => {
  const { theme } = useAppSelector(getAppState);

  const onClick = () => resetTheme();

  return (
    <Link href="/theme">
      <a onClick={onClick}>
        <button className={styles.button} type="button">
          <span className={styles.text} title={text ? undefined : 'Сменить тему'}>
            {text || `Тема: ${theme}`}
          </span>
        </button>
      </a>
    </Link>
  );
};

export { Button as ButtonChangeTheme };
