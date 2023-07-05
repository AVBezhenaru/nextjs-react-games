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
} from './WalletStyle';

const Bank = () => (
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
                <span style={{ fontSize: '14px' }}>Account id: </span>
                <span>10qw10qw</span>
                <span style={{ fontSize: '14px' }}>Amount: </span>
                <span>1000 AGC</span>
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

export default withRouter(Bank);
