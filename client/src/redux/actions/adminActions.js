import findIds from '../../utils/idsCollector';

export const DELETE_USERS = 'DELETE_USERS';
export const USER_TO_ADMIN = 'USER_TO_ADMIN';
export const ADMIN_TO_USER = 'ADMIN_TO_USER';
export const BLOCK_USER = 'BLOCK_USER';
export const UNBLOCK_USER = 'UNBLOCK_USER';

export const deleteUsers = () => {
  return (dispatch, getState) => {
    const ids = findIds();
    fetch('/users/delete', {
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
    fetch('/users/toadmin', {
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
    fetch('/users/touser', {
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
    fetch('/users/block', {
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
    fetch('/users/unblock', {
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
