import { GET_LAST_UPDATED, GET_RATED, GET_TAGS } from '../actions/homeActions';

let initialState = {
  lastUpdate: [],
  topRated: [],
  tags: [
    { id: '1', title: 'Sample 1' },
    { id: '2', title: 'Sample 2' },
    { id: '3', title: 'Sample 3' },
    { id: '4', title: 'Sample 4' },
    { id: '5', title: 'Sample 5' },
    { id: '6', title: 'Sample 6' },
    { id: '7', title: 'Sample 7' },
    { id: '8', title: 'Sample 8' },
    { id: '9', title: 'Sample 9' },
    { id: '10', title: 'Sample 10' }
  ]
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_UPDATED:
      return {...state, lastUpdate: action.payload};
    case GET_RATED:
      return {...state, topRated: action.payload};

    default:
      return state;
  }
};

export default homeReducer;
