import { SET_CURRENT_USER, UPDATE_LIKES, SAVE_OWN_VOTE } from '../actions/types';
import isEmpty from '../../utils/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case UPDATE_LIKES:
      const chapterId = action.chapterId;
      const userWithNewLikes = {
        ...state.user,
        likes: state.user.likes.includes(chapterId)
          ? state.user.likes.filter(el => el != chapterId)
          : [...state.user.likes, chapterId]
      };
      return { ...state, user: userWithNewLikes };
    case SAVE_OWN_VOTE:
      const fanficId = action.fanficId;
      const insertData = { fanficId, value: action.payload };
      const userWithNewStars = {
        ...state.user,
        stars: state.user.stars.some(el => el.fanficId == fanficId)
          ? [...state.user.stars
              .filter(el => el.fanficId != fanficId), insertData]
          : [...state.user.stars, insertData]
      };
      return { ...state, user: userWithNewStars };
    default:
      return state;
  }
}
