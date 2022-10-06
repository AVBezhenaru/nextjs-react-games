import React from 'react';

import ButtonChangeTheme from '../ButtonChangeTheme';
import ButtonPlayPause from '../ButtonPlayPause';
import GallowsPlace from '../GallowsPlace';
import GuessWord from '../GuessWord';
import LettersPanel from '../LettersPanel';

import styles from './App.module.scss';

const App = () => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.buttonContainer}>
        <ButtonChangeTheme />
        <ButtonPlayPause />
      </div>
    </div>

    <div className={styles.main}>
      <GallowsPlace />

      <GuessWord />

      <LettersPanel />
    </div>
  </div>
);

export default App;
