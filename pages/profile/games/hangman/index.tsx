import { NextPage } from 'next';
import React from 'react';

import { Layout } from '../../../../hangman/components';
import HelloTable from '../../../../hangman/components/HelloTable/HelloTable';

const Home: NextPage = () => (
  <Layout>
    <div style={{ display: 'flex', justifyContent: 'center', padding: '150px 0' }}>
      <HelloTable />
    </div>
  </Layout>
);

export default Home;
