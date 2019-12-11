import * as types from '../actions/profileActions';
import findIds from '../../utils/idsCollector';

let initialState = {
  userdata: {
    username: 'Test_nickname'
  },
  achieves: [
    { id: '1', title: 'Best of the best' },
    { id: '2', title: 'Freshman' },
    { id: '3', title: 'Rock-n-roll' }
  ],
  fanfics: [
    { id: '12122', title: 'Cool story', link: 'story_12122' },
    { id: '213245', title: 'Nothing else matter', link: 'story_213245' }
  ]
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
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
