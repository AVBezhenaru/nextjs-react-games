import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './scss/index.scss';

import store from './store';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
