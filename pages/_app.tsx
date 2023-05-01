import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Layout } from '../user/layout/layout';
import { persistor, store } from '../store';
import '../styles/index.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </Layout>
);

export default MyApp;
