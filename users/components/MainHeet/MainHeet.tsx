import React, { FC } from 'react';

import sl from '../../styles/global.module.scss';

const MainHeet: FC = () => (
  <div>
    <li className={sl.user__up}>
      <input className={sl.button__up} type="checkbox" />
      <p className={sl.text__up}>Image</p>
      <p className={sl.name__up}>Name</p>
      <p className={sl.date__up}>Date</p>
      <p className={sl.title__up}>Title</p>
      <p className={sl.amount__up}>Amount</p>
      <p className={sl.status__up}>Status</p>
      <p className={sl.action__up}>Action</p>
    </li>
  </div>
);

export default MainHeet;
