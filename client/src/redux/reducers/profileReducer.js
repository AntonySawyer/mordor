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
      return {
        ...state,
        fanfics: state.fanfics.filter(el => !ids.includes(el.id))
      };
    case types.CREATE_FANFIC:
      console.log('CREATE_FANFIC work');
      return state;
    case types.EDIT_FANFIC:
      console.log('EDIT_FANFIC work');
      return state;
    default:
      return state;
  }
};

export default profileReducer;
