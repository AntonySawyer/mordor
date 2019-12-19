import { DELETE_FANFICS } from './types';

import findIds from '../../utils/idsCollector';


export const deleteFanfic = (userId) => {
  return (dispatch, getState) => {
    const ids = findIds();
    fetch('/api/fanfic/delete', {
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
