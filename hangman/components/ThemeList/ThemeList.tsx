import Link from 'next/link';
import { useCallback } from 'react';
import { NextPage } from 'next';

import { useAppDispatch } from '../../../hooks';
import { setTheme } from '../../store/HangmanSlice';
import { data } from '../../data/words';

import styles from './index.module.scss';

const ThemeList: NextPage = () => {
  const dispatch = useAppDispatch();

  const onClick = useCallback(
    (theme: string) => () => {
      dispatch(setTheme(theme));
    },
    [],
  );

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.themes.map(({ name }) => (
          <Link key={name} href="/hangman/game">
            <a onClick={onClick(name)}>
              <li className={styles.item}>{`${name[0].toUpperCase()}${name.slice(1)} `}</li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export { ThemeList };
