import { SET_LANG, SET_THEME } from "./types";

export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLang = () => ({ type: SET_LANG });
