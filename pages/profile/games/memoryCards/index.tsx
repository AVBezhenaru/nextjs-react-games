import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { setTheme } from '../../../../memoryCards/store/memorySlice';
import { RootState } from '../../../../store';

import styles from './index.module.scss';

const Home: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.memoryCards);
  const dispatch = useDispatch();

  const changeTheme = (value: string) => {
    dispatch(setTheme(value));
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.header}>Memory Cards</h1>
      <div>
        <label className={styles.label}>
          Choose a picture theme
          <select
            className={styles.select}
            value={theme}
            onChange={(e) => changeTheme(e.target.value)}
          >
            <option value="nature">Nature</option>
            <option value="food">Food</option>
            <option value="arhitecture">Arhitecture</option>
            <option value="gothic">Gothic</option>
            <option value="travel">Travel</option>
          </select>
        </label>
      </div>
      <Link href="./memoryCards/Play">
        <button className={styles.play} type="button">
          Play
        </button>
      </Link>
    </div>
  );
};

export default Home;
