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
        <LiHeader>Support</LiHeader>
        <Li>Report</Li>
        <Li>Help</Li>
      </Ul>
    </DivSideBar>
  );
};

export default SideBar;
