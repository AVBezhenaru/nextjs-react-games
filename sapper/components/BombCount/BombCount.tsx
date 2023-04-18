import React from 'react';

import { getSapperState } from '../../store/sapperSlice';
import { useAppSelector } from '../../../hooks';

import classes from './BombCount.module.scss';

const BombCount: React.FC = () => {
  const { bombCount } = useAppSelector(getSapperState);

  return (
    <div className={classes.wrapper}>
      <div className={classes.icon} />
      <p className={classes.BombCount}>{String(bombCount)}</p>
    </div>
  );
};

export default BombCount;
