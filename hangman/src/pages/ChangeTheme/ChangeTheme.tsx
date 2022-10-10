import React, { FC } from 'react';

import { ButtonChangeTheme, Header, Main } from '../../components';
import { ThemeList } from '../../components/ThemeList/ThemeList';

const ChangeTheme: FC = () => (
  <>
    <Header>
      <ButtonChangeTheme text="Выберите тему" />
    </Header>

    <Main>
      <ThemeList />
    </Main>
  </>
);

export { ChangeTheme };
