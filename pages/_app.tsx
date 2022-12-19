import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { Layout } from '../user/layout/layout';
import { store } from '../store';
import '../styles/index.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </Layout>
);

export default MyApp;
