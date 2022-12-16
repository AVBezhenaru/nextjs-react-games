import { NextPage } from 'next';

import CheckersBoard from '../../../../checkersReborn/components/CheckersBoard/CheckersBoard';

const Single: NextPage = () => (
  <main className="app">
    <CheckersBoard />
  </main>
);

export default Single;
