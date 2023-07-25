import React from 'react';
import { Pagination, Radio } from 'antd';

import { User } from '../User/User';
import { IUser } from '../../types';

import {
  Table,
  HeaderCell,
  HeaderLi,
  Title,
  Footer,
  Header,
  Body,
  Sort,
  TitleSort,
} from './UsersTableStyle';

export const UsersTable: React.FC<{
  tenUsers: IUser[];
  currentPage: number;
  countUsers: number;
  setCurrentPage: (page: number) => void;
  setSortBy: (value: string) => void;
}> = ({ tenUsers, currentPage, countUsers, setCurrentPage, setSortBy }) => {
  const doneUsers = tenUsers.map((item) => <User {...item} key={item.id} />);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeSort = (evn: any) => {
    setSortBy(evn.target.value);
  };

  return (
    <Table>
      <Header>
        <Title>Users Table</Title>
        <Sort>
          <TitleSort>Sorted:</TitleSort>
          <Radio.Group defaultValue="id" buttonStyle="solid" onChange={onChangeSort}>
            <Radio.Button value="id">id</Radio.Button>
            <Radio.Button value="richest">richest</Radio.Button>
            <Radio.Button value="poorest">poorest</Radio.Button>
          </Radio.Group>
        </Sort>
      </Header>

      <Body>
        <HeaderLi>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Id</HeaderCell>
          <HeaderCell>Amount</HeaderCell>
        </HeaderLi>
        <ul>{doneUsers}</ul>
      </Body>

      <Footer>
        <Pagination
          current={currentPage}
          total={countUsers}
          pageSize={10}
          onChange={onChangePage}
        />
      </Footer>
    </Table>
  );
};
