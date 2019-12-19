import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { I18nextProvider } from 'react-i18next';
import { languageChange } from 'i18next-redux-languagedetector';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authentication';

import configureI18n from './i18n';
import Reducers from './redux/reducers/';
import App from './App';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import './index.css';

let defaultLang = 'en-US';
if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', 'en-US');
} else {
  defaultLang = localStorage.getItem('lang');
}

const i18nextConfig = {
  lng: defaultLang,
  language: null,
  whitelist: ['en', 'ru'],
  ns: ['common'],
  defaultNS: 'common'
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducers, {i18next: i18nextConfig}, 
composeEnhancer(applyMiddleware(thunk, logger)));

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

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

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
