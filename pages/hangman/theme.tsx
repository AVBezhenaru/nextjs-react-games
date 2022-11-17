import { NextPage } from 'next';

import { ButtonChangeTheme, Header, Layout, Main } from '../../hangman/components';
import { ThemeList } from '../../hangman/components/ThemeList/ThemeList';

const theme: NextPage = () => (
  <Layout>
    <Header>
      <ButtonChangeTheme text="Выберите тему" />
    </Header>

    <Main>
      <ThemeList />
    </Main>
  </Layout>
);

export default theme;
