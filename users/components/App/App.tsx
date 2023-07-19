import React, { useState } from 'react';
import { Pagination } from 'antd';

import sl from '../../styles/global.module.scss';
import { IUsers } from '../type/MyType';
import MainHeet from '../MainHeet/MainHeet';
import Header from '../Header/Header';
import Users from '../Users/Users';

const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [arrayUsers, setArrayUsers] = useState<IUsers[]>([
    { name: 'Salse', date: '1241141', title: '1', amount: '10', status: false },
    { name: 'Names2', date: '1241355', title: '2', amount: '5', status: true },
    { name: 'Names3', date: '1241113', title: '3', amount: '1', status: false },
    { name: 'aим', date: '12413131', title: '4', amount: '3', status: true },
    { name: 'Жора', date: '124122', title: '12', amount: '15', status: false },
    { name: 'Сайлас', date: '12423421', title: '11', amount: '0', status: false },
    { name: 'Games7', date: '124124214', title: '113', amount: '2', status: true },
    { name: 'Lames8', date: '12413231', title: '15', amount: '9', status: true },
    { name: 'Ffames9', date: '124122233', title: '167', amount: '0', status: true },
    { name: 'Bames10', date: '124122', title: '16', amount: '5', status: false },
  ]);
  const [current, setCurrent] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState<number>(5);
  const [filter, setFilter] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [maxPages, setMaxPages] = useState<number>(2);

  const filterUsers = arrayUsers.filter((users) =>
    users.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const totalPages = Math.ceil(arrayUsers.length / limit); // общее количество страниц

  const startPageIndex = Math.max(0, current - maxPages); // индекс первой страницы
  const endPageIndex = Math.min(totalPages - 1, current + maxPages - 1); // индекс последней страницы

  const startIndex = (current - 1) * limit; // индекс первого элемента на текущей странице
  const endIndex = Math.min(arrayUsers.length, startIndex + limit); // индекс последнего элемента на текущей странице

  const currentList = filterUsers.slice(startIndex, endIndex); // список пользователей на текущей странице

  return (
    <main className={sl.main}>
      <Header setFilter={setFilter} />
      <ul>
        <MainHeet />
        {currentList.map((user, index) => (
          <Users
            name={user.name}
            date={user.date}
            title={user.title}
            amount={user.amount}
            status={user.status}
            key={index}
          />
        ))}
      </ul>
      <Pagination
        className={sl.pagin}
        current={current}
        onChange={setCurrent}
        total={10}
        pageSize={5}
        showLessItems
        showTotal={(total, range) => `showing ${range[0]} to ${range[1]} of ${total} entries`}
        showQuickJumper
        showSizeChanger={false}
        itemRender={(page, type, originalElement) => {
          if (type === 'page') {
            const pageIndex = page - 1;
            if (pageIndex < startPageIndex || pageIndex > endPageIndex) {
              return null;
            }
          }
          return originalElement;
        }}
      />
    </main>
  );
};
export default Index;
