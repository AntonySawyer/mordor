import { GET_BY_TAG, GET_BY_CATEGORY } from './types';

export const getByTag = (tag) => {
  return (dispatch, getState) => {
    fetch('/api/fanfic/byTag', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tag })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: GET_BY_TAG, payload });
      });
  };
};

export const getByCategory = (category) => {
  return (dispatch, getState) => {
    fetch('/api/fanfic/byCategory', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: GET_BY_CATEGORY, payload });
      });
  };
};
