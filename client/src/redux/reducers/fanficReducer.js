import * as types from '../actions/fanficActions';


let initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_FANFIC:
      return action.payload;
    case types.READ_FANFIC:
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
