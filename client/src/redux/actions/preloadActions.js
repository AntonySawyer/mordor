import { GET_CONST, GET_TAGS } from './types';

export const getConst = () => {
  return (dispatch, getState) => {
    fetch('/api/categories/getlist', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }})
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: GET_CONST, payload });
      });
  };
};

export const getTags = () => {
  return (dispatch, getState) => {
    fetch('/api/tags/get', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }})
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: GET_TAGS, payload });
      });
  };
};