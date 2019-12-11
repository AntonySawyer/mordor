import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import profileReducer from './profileReducer';
import loginReducer from './loginReducer';
import homeReducer from "./homeReducer";

const redusers = combineReducers({
  homePage: homeReducer,
  profilePage: profileReducer,
  adminPage: adminReducer,
  loginPage: loginReducer
});

export default redusers;
