import { GET_LAST_UPDATED, GET_RATED } from '../actions/types';

let initialState = {
  lastUpdate: [],
  topRated: [],
  tags: []
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_UPDATED:
      return {...state, lastUpdate: action.payload};
    case GET_RATED:
      return {...state, topRated: action.payload};
    default:
      return state;
  }
};

export default homeReducer;
