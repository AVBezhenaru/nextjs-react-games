import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { Layout } from '../src/components/layout/layout';
import { store } from '../src/store';
import '../checkers/styles/globals.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </Layout>
);

export default MyApp;
