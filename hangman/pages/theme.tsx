import Router from 'next/router';
import { FC } from 'react';

import { ButtonChangeTheme, Header, Main } from '../components';
import { ThemeList } from '../components/ThemeList/ThemeList';

const theme: FC = () => {
  return (
    <>
      <Header>
        <ButtonChangeTheme text="Выберите тему" />
      </Header>

      <Main>
        <ThemeList />
      </Main>
    </>
  );
};

export default theme;
