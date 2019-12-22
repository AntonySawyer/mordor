import { combineReducers } from 'redux';
import { i18nextReducer } from 'i18next-redux-languagedetector';

import adminReducer from './adminReducer';
import profileReducer from './profileReducer';
import homeReducer from "./homeReducer";
import syncReducer from "./syncReducer";
import fanficReducer from "./fanficReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import searchReducer from './searchReducer';

const redusers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  search: searchReducer,
  syncParams: syncReducer,
  i18next: i18nextReducer,
  homePage: homeReducer,
  profilePage: profileReducer,
  adminPage: adminReducer,
  fanfic: fanficReducer
});

export default redusers;
