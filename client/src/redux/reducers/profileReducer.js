import * as types from '../actions/profileActions';
import { GET_PROFILE } from "../actions/preloadActions";
import findIds from '../../utils/idsCollector';

let initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    case types.DELETE_FANFICS:
      return {...state, fanfics: action.payload};
    default:
      return state;
  }
};

export default profileReducer;
