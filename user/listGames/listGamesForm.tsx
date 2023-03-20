import React from 'react';
import { withRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header';
import SideBar from '../header/sideBar';
import { FooterBar } from '../footer/footer';
import { DivPage, Section } from '../profile/profileStyle';
import tetrisIcon from '../img/tetrisIcon.png';
import chessIcon from '../img/chessIcon.png';
import checkersIcon from '../img/checkersIcon.png';
import hangmanIcon from '../img/hangmanIcon.png';
import aerohokkeyIcon from '../img/aerohokkeyIcon.png';
import solitairIcon from '../img/solitairIcon.png';
import game2048Icon from '../img/2048Icon.png';
import gamefruitNinjaIcon from '../img/gamefruitNinjaIcon.png';

import { GameLink } from './GameLink';
import { Games, Page, HeaderGames, ListGames } from './listGamesStyle';

const ListGamesForm = () => {
  const path = 'games/';

  const gameLinksArr = [
    { src: chessIcon.src, title: 'chess' },
    { src: checkersIcon.src, title: 'checkers' },
    { src: hangmanIcon.src, title: 'hangman' },
    { src: aerohokkeyIcon.src, title: 'airhockey' },
    { src: tetrisIcon.src, title: 'tetris' },
    { src: solitairIcon.src, title: 'solitaire' },
    { src: game2048Icon.src, title: 'game2048' },
    { src: gamefruitNinjaIcon.src, title: 'fruitninja' },
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
                    key={uuidv4()}
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
