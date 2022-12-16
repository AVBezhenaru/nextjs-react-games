import { NextPage } from 'next';

import CheckersBoard from '../../../../checkersReborn/components/CheckersBoard/CheckersBoard';

const Online: NextPage = () => (
  <main className="app">
    <CheckersBoard online />
  </main>
);

export default Online;
