export const GET_USERS = 'GET_USERS';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_MAIN_PAGE = 'GET_MAIN_PAGE';

export const getUsers = () => {
  return { type: GET_USERS };
};

export const getProfile = id => {
  console.log(`in action with ${id}`);
  const payload = {
    userdata: {
      username: 'Test_nickname',
      email: 'test@test.com',
      id: '2'
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
  return { type: GET_PROFILE, payload };
};

export const getMainPage = () => ({ type: GET_MAIN_PAGE });
