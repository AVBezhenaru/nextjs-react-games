import React, { FC } from 'react';

import ButtonChangeTheme from '../ButtonChangeTheme';
import ButtonPlayPause from '../ButtonPlayPause';
import GallowsPlace from '../GallowsPlace';
import GuessWord from '../GuessWord';
import Header from '../Header';
import LettersPanel from '../LettersPanel';
import Main from '../Main';

import styles from './App.module.scss';

const App: FC = () => (
  <div className={styles.container}>
    <Header>
      <ButtonChangeTheme />
      <ButtonPlayPause />
    </Header>

    <Main>
      <GallowsPlace />

      <GuessWord />

      <LettersPanel />
    </Main>
  </div>
);

export default App;
