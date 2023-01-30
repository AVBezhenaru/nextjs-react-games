import { NextPage } from 'next';

import Layout from '../../../../memoryCards/components/layout/Layout';
import Board from '../../../../memoryCards/components/board/Board';

const MemoryCards: NextPage = () => (
  <Layout>
    <Board />
  </Layout>
);

export default MemoryCards;
