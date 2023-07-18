import React from 'react';

import Stats from '../MainStatistics/MainStatistics';
import Charts from '../Charts/Charts';

import classes from './Statistics.module.scss';

const Statistics = () => (
  <div className={classes.Statistics}>
    <Stats />
    <Charts />
  </div>
);

export default Statistics;
