import { withRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FooterBar } from '../footer/footer';
import Header from '../header/header';
import SideBar from '../header/sideBar';
import game2048Icon from '../img/2048Icon.png';
import aerohokkeyIcon from '../img/aerohokkeyIcon.png';
import aimTrainerIcon from '../img/aim-trainer.svg';
import checkersIcon from '../img/checkersIcon.png';
import chessIcon from '../img/chessIcon.png';
import doodler from '../img/doodler-guy.png';
import fruitNinjaIcon from '../img/fruitNinjaIcon.png';
import hangmanIcon from '../img/hangmanIcon.png';
import memoryCards from '../img/memoryCards.png';
import sapperIcon from '../img/sapperIcon.png';
import snake from '../img/snake.png';
import solitairIcon from '../img/solitairIcon.png';
import tamagotchiIcon from '../img/tamagotchiIcon.svg';
import tanksIcon from '../img/tanksIcon.png';
import tetrisIcon from '../img/tetrisIcon.png';
import twoMinInSpaceIcon from '../img/twoMinInSpaceIcon.png';
import wordleIcon from '../img/wordleIcon.png';
import { DivPage, Section } from '../profile/profileStyle';

import { GameLink } from './GameLink';
import { Games, HeaderGames, ListGames, Page } from './listGamesStyle';

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
    { src: memoryCards.src, title: 'memoryCards' },
    { src: game2048Icon.src, title: 'game2048' },
    { src: fruitNinjaIcon.src, title: 'fruitninja' },
    { src: sapperIcon.src, title: 'sapper' },
    { src: tanksIcon.src, title: 'tanks' },
    { src: doodler.src, title: 'doodle-jump' },
    { src: aimTrainerIcon.src, title: 'aim trainer', href: 'aim-trainer' },
    { src: twoMinInSpaceIcon.src, title: '2min-in-space' },
    { src: tamagotchiIcon.src, title: 'tamagotchi', href: 'tamagotchi' },
    { src: wordleIcon.src, title: 'wordle', href: 'wordle' },
    { src: snake.src, title: 'snake', href: 'snake' },
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
