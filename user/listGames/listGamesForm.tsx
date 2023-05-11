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
import fruitNinjaIcon from '../img/fruitNinjaIcon.png';
import sapperIcon from '../img/sapperIcon.png';
import tanksIcon from '../img/tanksIcon.png';
import doodler from '../img/doodler-guy.png';
import aimTrainerIcon from '../img/aim-trainer.svg';
import tamagotchiIcon from '../img/tamagotchiIcon.svg';

import { GameLink } from './GameLink';
import { Games, Page, HeaderGames, ListGames } from './listGamesStyle';

type GameLinkData = {
  src: string;
  title: string;
  href?: string;
};

const ListGamesForm = () => {
  const path = 'games/';

  const gameLinksArr: GameLinkData[] = [
    { src: chessIcon.src, title: 'chess' },
    { src: checkersIcon.src, title: 'checkers' },
    { src: hangmanIcon.src, title: 'hangman' },
    { src: aerohokkeyIcon.src, title: 'airhockey' },
    { src: tetrisIcon.src, title: 'tetris' },
    { src: solitairIcon.src, title: 'solitaire' },
    { src: game2048Icon.src, title: 'game2048' },
    { src: fruitNinjaIcon.src, title: 'fruitninja' },
    { src: sapperIcon.src, title: 'sapper' },
    { src: tanksIcon.src, title: 'tanks' },
    { src: doodler.src, title: 'doodle-jump' },
    { src: aimTrainerIcon.src, title: 'aim trainer', href: 'aim-trainer' },
    { src: tamagotchiIcon.src, title: 'tamagotchi', href: 'tamagotchi' },
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
                    href={`${path}${item.href || item.title}`}
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
