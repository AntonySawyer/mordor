import { GET_USERS, GET_PROFILE, GET_CONST, GET_TAGS } from './types';


export const getUsers = () => {
  return (dispatch, getState) => {
    fetch('/api/users/userlist', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }})
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: GET_USERS, payload });
      });
  };
};

export const getProfile = id => {
  return (dispatch, getState) => {
    fetch('/getProfile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: GET_PROFILE, payload });
      });
  };
};

export const getConst = () => {
  return (dispatch, getState) => {
    fetch('/getConst', {
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