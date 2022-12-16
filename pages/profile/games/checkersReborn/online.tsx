import { NextPage } from 'next';

import CheckersBoard from '../../../../checkersReborn/components/CheckersBoard/CheckersBoard';

import classes from './Styles.module.scss';

const Online: NextPage = () => (
  <CheckersBoard online />
);

export default Online;
