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
      return {
        ...state,
        userlist: state.userlist.filter(el => !ids.includes(el.id))
      };
    case types.USER_TO_ADMIN:
      return {
        ...state,
        userlist: state.userlist.map(el => ({
          ...el,
          role: ids.includes(el.id) ? 'Admin' : el.role
        }))
      };
    case types.ADMIN_TO_USER:
      return {
        ...state,
        userlist: state.userlist.map(el => ({
          ...el,
          role: ids.includes(el.id) ? 'User' : el.role
        }))
      };
    case types.CHANGE_USER_STATUS:
      return {
        ...state,
        userlist: state.userlist.map(el => ({
          ...el,
          status: ids.includes(el.id)
            ? el.status === 'blocked'
              ? 'active'
              : 'blocked'
            : el.status
        }))
      };
    default:
      return state;
  }
};

export default adminReducer;
