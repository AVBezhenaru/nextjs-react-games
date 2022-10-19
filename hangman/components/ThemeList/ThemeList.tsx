import Link from 'next/link';
import { FC, useCallback } from 'react';

import { data } from '../../data/words';
import { useAppDispatch } from '../../hooks';
import { setTheme } from '../../store/reducers/AppSlice';

import styles from '/styles/ThemeList.module.scss';

const ThemeList: FC = () => {
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
          <Link key={name} href="/game">
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
