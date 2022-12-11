/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { DivSideBar, Li, LiHeader, StyledLink, Ul } from './sideBarStyle';

const SideBar = () => {
  const router = useRouter();
  // const [pathName, setPathName] = useState(router.pathname);

  const path = '/profile';
  const pathGames = '/games';

  return (
    <DivSideBar>
      <Ul>
        <LiHeader>Account</LiHeader>
        <StyledLink href={path} passHref>
          <Li pathname="profile" active={router.pathname}>
            Profile
          </Li>
        </StyledLink>
        <Li>Favorites</Li>
        <StyledLink href={`${path}/chats`} passHref>
          <Li pathname="chats" active={router.pathname}>
            Chats
          </Li>
        </StyledLink>
        <StyledLink href={`${path}/friends`} passHref>
          <Li pathname="friends" active={router.pathname}>
            Friends
          </Li>
        </StyledLink>
        <LiHeader>Main</LiHeader>
        <Li>News</Li>
        <Li>Store</Li>
        <LiHeader>Games</LiHeader>
        <StyledLink href={`${path}${pathGames}/chess`} passHref>
          <Li pathname="chess" active={router.pathname}>
            Chess
          </Li>
        </StyledLink>
        <StyledLink href={`${path}${pathGames}/checkers`} passHref>
          <Li pathname="checkers" active={router.pathname}>
            Checkers
          </Li>
        </StyledLink>
        <StyledLink href={`${path}${pathGames}/hangman`} passHref>
          <Li pathname="hangman" active={router.pathname}>
            Hangman
          </Li>
        </StyledLink>
        <StyledLink href={`${path}${pathGames}/tetris`} passHref>
          <Li pathname="tetris" active={router.pathname}>
            Tetris
          </Li>
        </StyledLink>
        {/* <StyledLink href={`${path}${pathGames}/airhockey`} passHref>
          <Li pathname="airhockey" active={router.pathname}>
            AirHockey
          </Li>
        </StyledLink> */}
        <StyledLink href={`${path}${pathGames}`} passHref>
          <Li pathname="games" active={router.pathname}>
            All games
          </Li>
        </StyledLink>
        <LiHeader>Support</LiHeader>
        <Li>Report</Li>
        <Li>Help</Li>
      </Ul>
    </DivSideBar>
  );
};

export default SideBar;
