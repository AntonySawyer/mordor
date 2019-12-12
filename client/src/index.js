import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { I18nextProvider } from 'react-i18next';
import { languageChange } from 'i18next-redux-languagedetector';

import configureI18n from './i18n';
import Reducers from './redux/reducers/';
import App from './App';
import './index.css';

const i18nextConfig = {
  lng: localStorage.getItem('lang'),
  language: null,
  whitelist: ['en', 'ru'],
  ns: ['common'],
  defaultNS: 'common'
};

const store = createStore(Reducers, {i18next: i18nextConfig}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const i18n = configureI18n({
  i18nextConfig,
  redux: {
    lookupRedux: function() {
      return store.getState().i18next;
    },
    cacheUserLanguageRedux: function(language) {
      store.dispatch(languageChange(language));
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    {/* </ConnectedRouter> */}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
