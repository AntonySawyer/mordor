import { DELETE_FANFICS, GET_PROFILE, UPDATE_LIKES, SAVE_OWN_VOTE } from '../actions/types';

let initialState = {};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    case DELETE_FANFICS:
      return { ...state, fanfics: action.payload };
    case UPDATE_LIKES:
      const chapterId = action.chapterId;
      const userWithNewLikes = {
        ...state.userdata,
        likes: state.userdata.likes.includes(chapterId)
          ? state.userdata.likes.filter(el => el != chapterId)
          : [...state.userdata.likes, chapterId]
      };
      console.log(userWithNewLikes);
      return { ...state, userdata: userWithNewLikes };
    case SAVE_OWN_VOTE:
      const fanficId = action.fanficId;
      const insertData = { fanficId, value: action.payload };
      const userWithNewStars = {
        ...state.userdata,
        stars: state.userdata.stars.some(el => el.fanficId == fanficId)
          ? [
              ...state.userdata.stars.filter(el => el.fanficId != fanficId),
              insertData
            ]
          : [...state.userdata.stars, insertData]
      };
      return { ...state, userdata: userWithNewStars };
    default:
      return state;
  }
};

export default profileReducer;
