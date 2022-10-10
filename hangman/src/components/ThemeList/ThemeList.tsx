import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { data, getThemeWord } from '../../data/data';
import { useAppDispatch } from '../../hooks';
import { setTheme } from '../../store/reducers/AppSlice';

import styles from './index.module.scss';

const ThemeList: FC = () => {
  const dispatch = useAppDispatch();

  const onClick = (theme: string) => () => {
    getThemeWord(theme);
    dispatch(setTheme(theme));
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.themes.map(({ name }) => (
          <Link key={name} style={{ textDecoration: 'none', color: '#000000' }} to="/game">
            <li className={styles.item} onClick={onClick(name)}>
              {name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export { ThemeList };
