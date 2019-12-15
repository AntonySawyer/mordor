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

export const saveFanfic = () => ({ type: SAVE_FANFIC });
