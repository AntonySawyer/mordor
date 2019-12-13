import * as types from '../actions/adminActions';
import findIds from '../../utils/idsCollector';

let initialState = {
  isFetching: false,
  userlist: [
    {
      id: '1',
      username: 'User1',
      link: '/user1',
      email: 'test1@test.com',
      role: 'Admin',
      status: 'active'
    },
    {
      id: '2',
      username: 'User2',
      link: '/user2',
      email: 'test2@test.com',
      role: 'User',
      status: 'blocked'
    },
    {
      id: '3',
      username: 'User3',
      link: '/user3',
      email: 'test3@test.com',
      role: 'User',
      status: 'active'
    },
    {
      id: '4',
      username: 'User4',
      link: '/user4',
      email: 'test4@test.com',
      role: 'User',
      status: 'active'
    }
  ]
};

const adminReducer = (state = initialState, action) => {
  const ids = findIds();
  switch (action.type) {
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
