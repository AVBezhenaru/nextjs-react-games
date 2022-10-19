import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../styles/index.scss';

import store from '../store';
import { Layout } from '../components';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
