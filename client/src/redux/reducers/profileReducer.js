import { DELETE_FANFICS, GET_PROFILE } from '../actions/types';

let initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    case DELETE_FANFICS:
      return {...state, fanfics: action.payload};
    default:
      return state;
  }
};

export default profileReducer;
