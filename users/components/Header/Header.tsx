import React, { FC } from 'react';

import Input from '../Input/Input';
import Avatar from '../Avatar/Avatar';

import hr from './Header.module.scss';

interface HeaderProps {
  setFilter: (filter: string) => void;
}

const Header: FC<HeaderProps> = ({ setFilter }) => (
  <div
    className={hr.header}
    style={{
      background: 'white',
    }}
  >
    <h1 style={{ color: 'black' }}>User List</h1>
    <Input setFilter={setFilter} />
    <Avatar />
  </div>
);

export default Header;
