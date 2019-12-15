import * as types from '../actions/profileActions';
import { GET_PROFILE } from "../actions/preloadActions";
import findIds from '../../utils/idsCollector';

let initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    case types.DELETE_FANFICS:
      const ids = findIds();
      return action.payload;
    // case types.CREATE_FANFIC:
    //   return action.payload;
    // case types.READ_FANFIC:
    //   return action.payload;
    // case types.EDIT_FANFIC:
    //   return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
