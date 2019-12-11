
let initialState = {
  lastUpdate: [
    {
      id: '12122',
      title: 'Cool story',
      link: 'story_12122',
      updateDate: '22.12.2019'
    },
    {
      id: '213245',
      title: 'Nothing else matter',
      link: 'story_213245',
      updateDate: '18.12.2019'
    },
    {
      id: '21324',
      title: 'Unforgiven 1',
      link: 'story_21324',
      updateDate: '14.12.2019'
    },
    {
      id: '213243',
      title: 'Unforgiven 2',
      link: 'story_213243',
      updateDate: '13.12.2019'
    },
    {
      id: '213246',
      title: 'Unforgiven 3',
      link: 'story_213246',
      updateDate: '13.12.2019'
    }
  ],
  topRated: [
    {
      id: '12122',
      title: 'Cool story',
      link: 'story_12122',
      stars: '5.0'
    },
    {
      id: '213245',
      title: 'Nothing else matter',
      link: 'story_213245',
      stars: '4.9'
    },
    {
      id: '21324',
      title: 'Unforgiven 1',
      link: 'story_21324',
      stars: '4.9'
    },
    {
      id: '213243',
      title: 'Unforgiven 2',
      link: 'story_213243',
      stars: '4.8'
    },
    {
      id: '213246',
      title: 'Unforgiven 3',
      link: 'story_213246',
      stars: '4.7'
    }
  ],
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
    default:
      return state;
  }
};

export default homeReducer;
