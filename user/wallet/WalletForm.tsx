import React from 'react';
import { withRouter } from 'next/router';

import Header from '../header/header';
import SideBar from '../header/sideBar';
import { FooterBar } from '../footer/footer';
import { DivPage, Section } from '../profile/profileStyle';
import { TopUpForm } from '../forms/TopUpForm';
import { TransferAGCForm } from '../forms/TransferAGCForm';

import {
  Page,
  WalletCard,
  Account,
  TopUp,
  Transfer,
  TitleCard,
  ContentCard,
  LineCard,
  SpanTitle,
  SpanValue,
} from './WalletFormStyle';

const WalletForm = () => {
  const userId = '10qw10qw';
  const userAmount = '1000';

  return (
    <>
      <Section>
        <Header />
        <DivPage>
          <SideBar />
          <Page>
            <WalletCard>
              <Account>
                <TitleCard style={{ color: '#e46f39' }}>Account</TitleCard>
                <LineCard />
                <ContentCard>
                  <SpanTitle>Account id: </SpanTitle>
                  <SpanValue>{userId}</SpanValue>
                  <SpanTitle>Amount: </SpanTitle>
                  <SpanValue>{userAmount} AGC</SpanValue>
                </ContentCard>
              </Account>
              <TopUp>
                <TitleCard>Top up</TitleCard>
                <LineCard />
                <ContentCard>
                  <TopUpForm />
                </ContentCard>
              </TopUp>
              <Transfer>
                <TitleCard>Transfer</TitleCard>
                <LineCard />
                <ContentCard>
                  <TransferAGCForm />
                </ContentCard>
              </Transfer>
            </WalletCard>
          </Page>
        </DivPage>
      </Section>
      <FooterBar />
    </>
  );
};

export default withRouter(WalletForm);
