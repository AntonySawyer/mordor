export const SAVE_FANFIC = 'SAVE_FANFIC';
export const READ_FANFIC = 'READ_FANFIC';


export const readFanfic = (id) => {
  return (dispatch, getState) => {
    fetch('/fanfic/get', {
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

export const saveFanfic = (id, title, tags, category, userId, chapters, images) => {
  return (dispatch, getState) => {
    fetch('/fanfic/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, title, tags, category, userId, chapters, images })
    })
      .then(rs => rs.json())
      .then(payload => {
        console.log(payload);
        return dispatch({ type: SAVE_FANFIC, payload });
      });
  };
};
