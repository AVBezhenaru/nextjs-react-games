import React from 'react';
import { FC } from 'react';
import { ButtonChangeTheme } from '../components';
import HelloTable from '../components/HelloTable/HelloTable';

const Home: FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '15rem 10rem' }}>
      <HelloTable />
    </div>
  );
};

export default Home;
