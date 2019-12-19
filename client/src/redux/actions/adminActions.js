import findIds from '../../utils/idsCollector';
import {
  DELETE_USERS,
  USER_TO_ADMIN,
  ADMIN_TO_USER,
  BLOCK_USER,
  UNBLOCK_USER
} from './types';

export const deleteUsers = () => {
  return (dispatch, getState) => {
    const ids = findIds();
    fetch('/api/users/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: DELETE_USERS, payload });
      });
  };
};

export const userToAdmin = () => {
  return (dispatch, getState) => {
    const ids = findIds();
    fetch('/api/users/toadmin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: USER_TO_ADMIN, payload });
      });
  };
};

export const adminToUser = () => {
  return (dispatch, getState) => {
    const ids = findIds();
    fetch('/api/users/touser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: ADMIN_TO_USER, payload });
      });
  };
};

export const blockUser = () => {
  return (dispatch, getState) => {
    const ids = findIds();
    fetch('/api/users/block', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: BLOCK_USER, payload });
      });
  };
};

export const unblockUser = () => {
  return (dispatch, getState) => {
    const ids = findIds();
    fetch('/api/users/unblock', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: UNBLOCK_USER, payload });
      });
  };
};
