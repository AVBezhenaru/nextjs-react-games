import { NextPage } from 'next';

import CheckersBoard from '../../../../checkersReborn/components/CheckersBoard/CheckersBoard';

const Single: NextPage = () => <CheckersBoard online={false} />;

export default Single;
