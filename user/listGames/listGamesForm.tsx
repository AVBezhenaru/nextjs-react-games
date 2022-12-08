import React from 'react';
import { withRouter } from 'next/router';

import Header from '../header/header';
import SideBar from '../header/sideBar';
import { DivPage, Section } from '../profile/profileStyle';
import tetrisIcon from '../img/tetrisIcon.png';
import chessIcon from '../img/chessIcon.png';
import checkersIcon from '../img/checkersIcon.png';
import hangmanIcon from '../img/hangmanIcon.png';

import { GameLink } from './GameLink';
import { Games, Page, HeaderGames, ListGames } from './listGamesStyle';

const ListGamesForm = () => (
  <Section>
    <Header />
    <DivPage>
      <SideBar />
      <Page>
        <Games>
          <HeaderGames>GAMES</HeaderGames>
          <ListGames>
            <GameLink src={tetrisIcon.src} title="tetris" href="/tetris" />
            <GameLink src={chessIcon.src} title="chess" href="/chess" />
            <GameLink src={checkersIcon.src} title="checkers" href="/checkers" />
            <GameLink src={hangmanIcon.src} title="hangman" href="/hangman" />
          </ListGames>
        </Games>
      </Page>
    </DivPage>
  </Section>
);

export default withRouter(ListGamesForm);
