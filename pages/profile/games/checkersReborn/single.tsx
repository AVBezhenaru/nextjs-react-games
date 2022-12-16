import { NextPage } from 'next';

import CheckersBoard from '../../../../checkersReborn/components/CheckersBoard/CheckersBoard';

const Single: NextPage = () => (
  <main className="app">
    <CheckersBoard online={false} />
  </main>
);

export default Single;
