import { GET_LAST_UPDATED, GET_RATED } from './types';

export const getLastUpdated = (id) => {
  return (dispatch, getState) => {
    fetch('/api/fanfic/lastUpdated', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: GET_LAST_UPDATED, payload });
      });
  };
};

export const getRated = (id) => {
  return (dispatch, getState) => {
    fetch('/api/fanfic/maxRated', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: GET_RATED, payload });
      });
  };
};