import { GET_USERS, DELETE_USERS, USER_TO_ADMIN, ADMIN_TO_USER, BLOCK_USER, UNBLOCK_USER } from '../actions/types.js';

let initialState = {};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case DELETE_USERS:
      return action.payload;
    case USER_TO_ADMIN:
      return action.payload;
    case ADMIN_TO_USER:
      return action.payload;
    case BLOCK_USER:
      return action.payload;
    case UNBLOCK_USER:
      return action.payload;
    default:
      return state;
  }
};

export default adminReducer;
