import { SET_LANG, SET_THEME } from '../actions/syncActions';
import { GET_CONST } from '../actions/preloadActions';

let initialState = {};

initialState.activeTheme = localStorage.getItem('theme') || '';
initialState.activeLang = localStorage.getItem('lang');

document.querySelector('body').classList = [initialState.activeTheme];

const syncReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      localStorage.setItem('theme', action.payload);
      document.querySelector('body').classList = [action.payload];
      return { ...state, activeTheme: action.payload };
    case GET_CONST:
      return { ...state, CONST: action.payload[0] };
    default:
      return state;
  }
};

export default syncReducer;
