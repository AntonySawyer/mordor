export const GET_USERS = 'GET_USERS';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_MAIN_PAGE = 'GET_MAIN_PAGE';
export const GET_CONST = 'GET_CONST';

export const getUsers = () => {
  return (dispatch, getState) => {
    fetch('/getUsers', {
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
getConst();

export const getMainPage = () => ({ type: GET_MAIN_PAGE });
