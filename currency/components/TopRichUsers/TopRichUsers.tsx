import React from 'react';

import { useAppSelector } from '../../../hooks';

import { Table, Title, Line, Header, Cell, HeaderCell } from './TopRichUsersStyle';

export const TopRichUsers: React.FC = () => {
  const { users } = useAppSelector((state) => state.users);
  let richUsers = [...users];
  richUsers = richUsers.sort((a, b) => Number(b.amount) - Number(a.amount));

  const first = richUsers[0];
  const second = richUsers[1];
  const third = richUsers[2];

  return (
    <Table>
      <Title>Top Rich Users</Title>
      <Header>
        <HeaderCell>Name</HeaderCell>
        <HeaderCell>Amount</HeaderCell>
      </Header>
      <Line>
        <Cell>{first.name}</Cell>
        <Cell>{first.amount}</Cell>
      </Line>
      <Line>
        <Cell>{second.name}</Cell>
        <Cell>{second.amount}</Cell>
      </Line>
      <Line>
        <Cell>{third.name}</Cell>
        <Cell>{third.amount}</Cell>
      </Line>
    </Table>
  );
};
