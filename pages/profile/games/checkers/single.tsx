import { NextPage } from 'next';

import CheckersBoard from '../../../../checkers/components/CheckersBoard/CheckersBoard';

const Single: NextPage = () => <CheckersBoard online={false} />;

export default Single;
