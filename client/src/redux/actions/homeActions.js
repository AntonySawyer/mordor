export const GET_LAST_UPDATED = 'GET_LAST_UPDATED';
export const GET_RATED = 'GET_RATED';
export const GET_TAGS = 'GET_TAGS'; //move to sync


export const getLastUpdated = (id) => {
  return (dispatch, getState) => {
    fetch('/fanfic/lastUpdated', {
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
    fetch('/fanfic/maxRated', {
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