import { SAVE_FANFIC, READ_FANFIC, UPDATE_LIKES } from '../actions/types';

let initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FANFIC:
      return action.payload;
    case READ_FANFIC:
      return action.payload;
    case UPDATE_LIKES:
      const newChapters = state.chapters.map(el => el._id == action.targetId ? {...el, likes: action.payload} : el); // Just active from state in future
      return {...state, chapters: newChapters} 
    default:
      return state;
  }
};

export default profileReducer;
