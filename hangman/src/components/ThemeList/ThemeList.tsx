import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { data } from '../../data/words';
import { useAppDispatch } from '../../hooks';
import { setTheme } from '../../store/reducers/AppSlice';

import styles from './index.module.scss';

const ThemeList: FC = () => {
  const dispatch = useAppDispatch();

  const onClick = (theme: string) => () => {
    dispatch(setTheme(theme));
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.themes.map(({ name }) => (
          <Link key={name} style={{ textDecoration: 'none', color: '#000000' }} to="/game">
            <li className={styles.item} onClick={onClick(name)}>
              {`${name[0].toUpperCase()}${name.slice(1)} `}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export { ThemeList };
