import React from 'react';

import {
  ButtonChangeTheme,
  ButtonPlayPause,
  GallowsPlace,
  GuessWord,
  Header,
  LettersPanel,
  Main,
} from '../../components';

export const Game = () => (
  <>
    <Header>
      <ButtonChangeTheme theme="страны" />
      <ButtonPlayPause play />
    </Header>

    <Main>
      <GallowsPlace />

      <GuessWord />

      <LettersPanel />
    </Main>
  </>
);
