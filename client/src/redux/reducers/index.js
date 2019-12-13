import { combineReducers } from 'redux';
import { i18nextReducer } from 'i18next-redux-languagedetector';

import adminReducer from './adminReducer';
import profileReducer from './profileReducer';
import loginReducer from './loginReducer';
import homeReducer from "./homeReducer";
import syncReducer from "./syncReducer";

const redusers = combineReducers({
  syncParams: syncReducer,
  i18next: i18nextReducer,
  homePage: homeReducer,
  profilePage: profileReducer,
  adminPage: adminReducer,
  loginStatus: loginReducer
});

export default redusers;
