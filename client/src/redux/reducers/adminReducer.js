import * as types from '../actions/adminActions';
import { GET_USERS } from '../actions/preloadActions';
import findIds from '../../utils/idsCollector';

let initialState = {};

const adminReducer = (state = initialState, action) => {
  const ids = findIds();
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case types.DELETE_USERS:
      return action.payload;
    case types.USER_TO_ADMIN:
      return action.payload;
    case types.ADMIN_TO_USER:
      return action.payload;
    case types.BLOCK_USER:
      return action.payload;
    case types.UNBLOCK_USER:
      return action.payload;
    default:
      return state;
  }
};

export default adminReducer;
