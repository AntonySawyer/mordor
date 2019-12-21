import { SET_CURRENT_USER, UPDATE_LIKES } from '../actions/types';
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
      const newUser = {
        ...state.user,
        likes: state.user.likes.includes(chapterId)
          ? state.user.likes.filter(el => el != chapterId)
          : [...state.user.likes, chapterId]
      };
      return { ...state, user: newUser };
    default:
      return state;
  }
}
