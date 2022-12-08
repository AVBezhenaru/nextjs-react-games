/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { DivSideBar, Li, LiHeader, StyledLink, Ul } from './sideBarStyle';

const SideBar = () => {
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);

  return (
    <DivSideBar>
      <Ul>
        <LiHeader>Account</LiHeader>
        <StyledLink href="/profile" passHref>
          <Li pathname="profile" active={router.pathname}>
            Profile
          </Li>
        </StyledLink>
        <Li>Favorites</Li>
        <StyledLink href="/chats" passHref>
          <Li pathname="chats" active={router.pathname}>
            Chats
          </Li>
        </StyledLink>
        <StyledLink href="/friends">
          <Li pathname="friends" active={router.pathname}>
            Friends
          </Li>
        </StyledLink>
        <LiHeader>Main</LiHeader>
        <Li>News</Li>
        <Li>Store</Li>
        <LiHeader>Games</LiHeader>
        <StyledLink href="/chess" passHref>
          <Li pathname="chess" active={router.pathname}>
            Chess
          </Li>
        </StyledLink>
        <StyledLink href="/checkers" passHref>
          <Li pathname="checkers" active={router.pathname}>
            Checkers
          </Li>
        </StyledLink>
        <StyledLink href="/hangman" passHref>
          <Li pathname="hangman" active={router.pathname}>
            Hangman
          </Li>
        </StyledLink>
        <StyledLink href="/tetris" passHref>
          <Li pathname="tetris" active={router.pathname}>
            Tetris
          </Li>
        </StyledLink>
        <StyledLink href="/games" passHref>
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
