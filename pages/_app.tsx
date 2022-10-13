import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '../components/layout/layout';
import { store } from '../store';
import '../styles/globals.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
