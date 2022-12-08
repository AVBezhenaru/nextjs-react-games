/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import { DivHeader, DivLogo, DivNav, LogOut, Search, Span } from './headerStyle';

const Header = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['user']);
  const router = useRouter();
  const currentUser = cookies.user;
  return (
    <DivHeader>
      <DivLogo>
        <img
          src="https://media.tenor.com/tyvFaQKybq0AAAAi/gaming-games.gif"
          alt="duck"
          width="70px"
          height="auto"
        />
        <p>All Games</p>
      </DivLogo>
      <DivNav>
        <Search type="text" placeholder="Search" />
        {!currentUser ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <></>
        ) : (
          <Span>
            <LogOut
              type="button"
              children="log out"
              onClick={() => {
                removeCookie('user');
                router.push('/');
              }}
            />
            <img
              src="https://consultus.org/cus/wp-content/uploads/2015/06/Avatare-w-2.jpg"
              alt=""
              style={{ width: '50px', height: 'auto' }}
            />
            <p> {currentUser.username} </p>
          </Span>
        )}
      </DivNav>
    </DivHeader>
  );
};

export default Header;
