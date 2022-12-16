import { NextPage } from 'next';

import CheckersBoard from '../../../../checkersReborn/components/CheckersBoard/CheckersBoard';

import classes from './Styles.module.scss';

const Single: NextPage = () => (
  <CheckersBoard online={false} />
);

export default Single;
