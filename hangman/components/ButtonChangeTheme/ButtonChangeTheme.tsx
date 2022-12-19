import Link from 'next/link';
import { NextPage } from 'next';

import { useAppSelector } from '../../../hooks';
import { getAppState, resetTheme } from '../../store/HangmanSlice';

import styles from './index.module.scss';

type ButtonProps = {
  text?: string;
};

const ButtonChangeTheme: NextPage<ButtonProps> = ({ text }) => {
  const { theme } = useAppSelector(getAppState);

  const onClick = () => resetTheme();

  return (
    <Link href="./hangman/theme">
      <a onClick={onClick}>
        <button className={styles.button} type="button">
          <span className={styles.text} title={text ? undefined : 'Сменить тему'}>
            {text || (theme && `Тема: ${theme.label}`) || 'Loading...'}
          </span>
        </button>
      </a>
    </Link>
  );
};

export { ButtonChangeTheme };
