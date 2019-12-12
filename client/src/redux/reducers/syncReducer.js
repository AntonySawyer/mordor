import * as types from '../actions/syncActions';

let initialState = {};

initialState.activeTheme = localStorage.getItem('theme') || '';
initialState.activeLang = localStorage.getItem('lang');

document.querySelector('body').classList = [initialState.activeTheme];

const syncReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_THEME:
        localStorage.setItem('theme', action.payload);
        document.querySelector('body').classList = [action.payload];
      return {...state, activeTheme: action.payload};
    default:
      return state;
  }
};

export default syncReducer;
