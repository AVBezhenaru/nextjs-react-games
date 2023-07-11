import React, { FC } from 'react';

import sl from '../../styles/global.module.scss';
import { IUsers } from '../type/MyType';
import Avatar from '../Avatar/Avatar';

const Users: FC<IUsers> = ({ name, date, title, status, amount }) => (
  <div>
    <li className={sl.user}>
      <input className={sl.button__up} type="checkbox" />
      <Avatar />
      <a className={sl.name__up}>{name}</a>
      <p className={sl.date__up}>{date}</p>
      <p className={sl.title__up}>{title}</p>
      <p className={sl.amount__up}>{amount}</p>
      <p className={sl.status__up}>
        {status ? (
          <a
            style={{
              backgroundColor: 'green',
            }}
          >
            Online
          </a>
        ) : (
          <a>Danger</a>
        )}
      </p>
      <p className={sl.action__up}>...</p>
    </li>
  </div>
);

export default Users;
