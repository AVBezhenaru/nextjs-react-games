import React from 'react';

import { IUser } from '../../types';

import { Cell, Li } from './UserStyle';

export const User: React.FC<IUser> = ({ name, id, amount }: IUser) => (
  <div>
    <Li>
      <Cell>{name}</Cell>
      <Cell>{id}</Cell>
      <Cell>{amount}</Cell>
    </Li>
  </div>
);
