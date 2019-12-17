import * as types from '../actions/adminActions';
import { GET_USERS } from '../actions/preloadActions';

let initialState = {};

const adminReducer = (state = initialState, action) => {
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
