import findIds from '../../utils/idsCollector';

export const DELETE_FANFICS = 'DELETE_FANFICS';

export const deleteFanfic = (userId) => {
  return (dispatch, getState) => {
    const ids = findIds();
    console.log(userId);
    console.log(ids);
    fetch('/fanfic/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids, userId })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: DELETE_FANFICS, payload });
      });
  };
};
