import React from 'react';
import { withRouter } from 'next/router';

import Header from '../header/header';
import SideBar from '../header/sideBar';
import { FooterBar } from '../footer/footer';
import { DivPage, Section } from '../profile/profileStyle';
import tetrisIcon from '../img/tetrisIcon.png';
import chessIcon from '../img/chessIcon.png';
import checkersIcon from '../img/checkersIcon.png';
import hangmanIcon from '../img/hangmanIcon.png';
import aerohokkeyIcon from '../img/aerohokkeyIcon.png';

import { GameLink } from './GameLink';
import { Games, Page, HeaderGames, ListGames } from './listGamesStyle';

const ListGamesForm = () => {
  const path = 'games/';

  const gameLinksArr = [
    { key: 101, src: tetrisIcon.src, title: 'tetris' },
    { key: 102, src: chessIcon.src, title: 'chess' },
    { key: 103, src: checkersIcon.src, title: 'checkers' },
    { key: 104, src: hangmanIcon.src, title: 'hangman' },
    { key: 105, src: aerohokkeyIcon.src, title: 'airhockey' },
  ];
  return (
    <>
      <Section>
        <Header />
        <DivPage>
          <SideBar />
          <Page>
            <Games>
              <HeaderGames>GAMES</HeaderGames>
              <ListGames>
                {gameLinksArr.map((item) => (
                  <GameLink
                    key={item.key}
                    src={item.src}
                    title={item.title}
                    href={`${path}${item.title}`}
                  />
                ))}
              </ListGames>
            </Games>
          </Page>
        </DivPage>
      </Section>
      <FooterBar />
    </>
  );
};

export default withRouter(ListGamesForm);
