import '@module-federation/nextjs-mf/lib/include-defaults';
import { Provider } from 'react-redux';
import { store} from "../store/store";
import '../styles/globals.scss';
import Layout from "../components/layout/layout";

import dynamic from 'next/dynamic';
const App = dynamic(
  async () => {
    return import('../async-pages/_app');
  },
  {
    ssr: false,
  },
);

function MyApp(props) {

  return (
      <Provider store={store}>
          <Layout>
              <App {...props} />;
          </Layout>
      </Provider>

  )
}

export default MyApp;
