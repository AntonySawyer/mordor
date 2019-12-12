export const SET_LANG = 'SET_LANG';
export const SET_THEME = 'SET_THEME';

export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLang = () => ({ type: SET_LANG });
