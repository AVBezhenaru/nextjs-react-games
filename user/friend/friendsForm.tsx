import React from 'react';
import Select from 'react-select';

import { DivPage, Section } from '../profile/profileStyle';
import Header from '../header/header';
import SideBar from '../header/sideBar';
import { FooterBar } from '../footer/footer';

import { DivFriends, DivSearch, FriendItem, Page, Search, SelectFilter } from './friendsStyle';

const FriendsForm = () => {
  const options = [
    { label: 'All', value: 1, style: { color: 'red' } },
    { label: 'Online', value: 2, style: { color: 'red' } },
    { label: 'Offline', value: 3, style: { color: 'blue' } },
  ];

  return (
    <>
      <Section>
        <Header />
        <DivPage>
          <SideBar />
          <Page>
            <DivSearch>
              <Search type="text" placeholder="Search" />
              <SelectFilter>
                <Select options={options} />
              </SelectFilter>
            </DivSearch>
            <DivFriends>
              <FriendItem />
              <FriendItem />
              <FriendItem />
              <FriendItem />
              <FriendItem />
              <FriendItem />
            </DivFriends>
          </Page>
        </DivPage>
      </Section>
      <FooterBar />
    </>
  );
};

export default FriendsForm;
