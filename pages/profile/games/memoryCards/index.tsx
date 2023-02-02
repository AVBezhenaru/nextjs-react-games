import Link from 'next/link';
import React, { useState } from 'react';

import styles from './index.module.scss';

export const ThemeContext = React.createContext('nature');

const Home = () => {
  const [theme, setTheme] = useState('nature');

  const changeTheme = (value: string) => {
    setTheme(value);
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
