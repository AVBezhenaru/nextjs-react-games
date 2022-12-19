import React from 'react';
import { NextPage } from 'next';

import { Layout } from '../../../../airhockey/components/Layout/Layout';
import Buttons from '../../../../airhockey/components/Buttons/Buttons';

const Home: NextPage = () => (
  <Layout>
    <Buttons />
  </Layout>
);

export default Home;
