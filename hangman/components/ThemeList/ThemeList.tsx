import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { NextPage } from 'next';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAppState, getThemes, setTheme } from '../../store/HangmanSlice';

import styles from './index.module.scss';

const ThemeList: NextPage = () => {
  const dispatch = useAppDispatch();
  const { themesList } = useAppSelector(getAppState);

  useEffect(() => {
    dispatch(getThemes());
  }, []);

  const onClick = useCallback(
    (theme: string) => () => {
      dispatch(setTheme(theme));
    },
    [],
  );

  return (
    themesList && (
      <div className={styles.container}>
        <ul className={styles.list}>
          {themesList.map((theme) => (
            <Link key={theme} href="/hangman/game">
              <a onClick={onClick(theme)}>
                <li className={styles.item}>{`${theme[0].toUpperCase()}${theme.slice(1)} `}</li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    )
  );
};

export { ThemeList };
