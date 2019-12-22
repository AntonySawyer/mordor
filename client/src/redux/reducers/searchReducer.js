import { GET_BY_TAG, GET_BY_CATEGORY } from '../actions/types';

let initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BY_TAG:
      return action.payload.length !== 0 ? action.payload : ['empty'];
    case GET_BY_CATEGORY:
      return action.payload.length !== 0 ? action.payload : ['empty'];
    default:
      return state;
  }
};

export default profileReducer;
