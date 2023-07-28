import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Layout } from '../user/layout/layout';
import { persistor, store } from '../store';
import '../styles/index.scss';
import { PageTracking } from '../user/pageTracking/PageTracking';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  PageTracking();
  return (
    <Layout>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </Layout>
  );
};
export default MyApp;
