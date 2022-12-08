/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { InputBtn } from '../forms/loginFormStyle';
import Header from '../header/header';
import SideBar from '../header/sideBar';
import { Li, Ul } from '../header/sideBarStyle';

import {
  AddComments,
  BlockLeft,
  BlockRight,
  Button,
  DivComments,
  DivImgBack,
  DivPage,
  DivProfileInfo,
  DivProfileNav,
  Follower,
  H3,
  ImgBack,
  InputBtnUser,
  P,
  Page,
  Posts,
  Section,
  Textarea,
  User,
  UserStatic,
} from './profileStyle';

interface ProfileAvatarProps {
  name?: string;
  tagName?: string;
  icon: string;
}

const ProfileAvatar = ({ icon, name, tagName }: ProfileAvatarProps) => (
  <User>
    <img src={icon} alt="" width="100px" height="auto" style={{ borderRadius: '50%' }} />
    {name && (
      <p>
        {name}
        <br />
        {tagName}
      </p>
    )}
  </User>
);

const ProfileForm = () => {
  const [cookies, setCookies] = useCookies(['user']);
  const [showChild, setShowChild] = useState(false);
  const currentUser = cookies.user;

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  }
  return (
    <Section>
      <Header />
      <DivPage>
        <SideBar />
        <Page>
          <BlockLeft>
            <DivImgBack>
              <ImgBack>
                {!currentUser ? (
                  <></>
                ) : (
                  <ProfileAvatar
                    icon="https://consultus.org/cus/wp-content/uploads/2015/06/Avatare-w-2.jpg"
                    name={currentUser.username}
                  />
                )}
              </ImgBack>
            </DivImgBack>
            <DivProfileNav>
              <Button children="Overview" />
              <Button children="Info" />
              <Button children="Activity" />
              <Button children="Friends" />
              <Button children="Group" />
            </DivProfileNav>
            <DivComments>
              <AddComments>
                <P>Leave a comments</P>

                <Textarea placeholder="Please enter your text..." />
                <InputBtn children="SEND MESSAGE" />
              </AddComments>
            </DivComments>
          </BlockLeft>
          <BlockRight>
            <DivProfileInfo>
              {!currentUser ? (
                <></>
              ) : (
                <ProfileAvatar
                  icon="https://consultus.org/cus/wp-content/uploads/2015/06/Avatare-w-2.jpg"
                  name={currentUser.username}
                  tagName="@tagName"
                />
              )}
              <UserStatic>
                <Follower children="followers" />
                <Posts children="posts" />
              </UserStatic>
              <InputBtnUser children="WIEV MY PROFILE" />
            </DivProfileInfo>
            <DivProfileInfo>
              <H3>My friend</H3>
              <Ul>
                <Li>friend</Li>
                <Li>friend</Li>
                <Li>friend</Li>
              </Ul>
              <InputBtnUser children="VIEW ALL" />
            </DivProfileInfo>
          </BlockRight>
        </Page>
      </DivPage>
    </Section>
  );
};

export default withRouter(ProfileForm);
