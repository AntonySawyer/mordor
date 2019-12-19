import { SAVE_FANFIC, READ_FANFIC } from '../actions/types';

let initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FANFIC:
      return action.payload;
    case READ_FANFIC:
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
