import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../hooks';

import { Page, VerticalPanel, HorizontalPanel } from './CurrencyPanelStyle';
import { TransactionPanel } from './components/TransactionPanel/TransactionPanel';
import { UsersTable } from './components/UsersTable/UsersTable';
import { ChartCurrency } from './components/ChartCurrency/ChartCurrency';
import { TopRichUsers } from './components/TopRichUsers/TopRichUsers';
import { IUser } from './types';

export const CurrencyPanel: React.FC = () => {
  const { users } = useAppSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countUsers, setCountUsers] = useState<number>(users.length);
  const [sortBy, setSortBy] = useState<string>('id');
  const [allUsers, setAllUsers] = useState<IUser[]>(users);

  useEffect(() => {
    setCountUsers(users.length);
    setAllUsers(users);
  }, [users]);

  const tenUsers = allUsers.slice((currentPage - 1) * 10, currentPage * 10);

  useEffect(() => {
    const tmpUsers = [...allUsers];

    if (sortBy === 'id') {
      tmpUsers.sort((a, b) => Number(a.id) - Number(b.id));
    } else if (sortBy === 'richest') {
      tmpUsers.sort((a, b) => Number(b.amount) - Number(a.amount));
    } else {
      tmpUsers.sort((a, b) => Number(a.amount) - Number(b.amount));
    }

    setAllUsers(tmpUsers);
  }, [sortBy]);

  return (
    <Page>
      <UsersTable
        tenUsers={tenUsers}
        currentPage={currentPage}
        countUsers={countUsers}
        setCurrentPage={setCurrentPage}
        setSortBy={setSortBy}
      />
      <VerticalPanel>
        <HorizontalPanel>
          <TransactionPanel />
          <TopRichUsers />
        </HorizontalPanel>

        <ChartCurrency tenUsers={tenUsers} />
      </VerticalPanel>
    </Page>
  );
};
