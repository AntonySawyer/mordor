import { READ_FANFIC, SAVE_FANFIC, SAVE_TAGS } from './types';


export const readFanfic = (id) => {
  return (dispatch, getState) => {
    fetch('/api/fanfic/get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: READ_FANFIC, payload });
      });
  };
};

export const saveFanfic = (id, title, tags, category, shortDescr, userId, chapters, images, stars) => {
  return (dispatch, getState) => {
    fetch('/api/fanfic/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, title, tags, category, shortDescr, userId, chapters, images, stars })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: SAVE_FANFIC, payload });
      });
  };
};

export const saveTags = ( tags ) => {
  return (dispatch, getState) => {
    fetch('/api/tags/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tags })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: SAVE_TAGS, payload });
      });
  };
};
