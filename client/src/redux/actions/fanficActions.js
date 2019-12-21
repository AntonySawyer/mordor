import {
  READ_FANFIC,
  SAVE_FANFIC,
  SAVE_TAGS,
  UPDATE_LIKES,
  UPDATE_STARS,
  SAVE_OWN_VOTE
} from './types';
import socket from '../../socket';

export const readFanfic = id => {
  return (dispatch, getState) => {
    fetch('/api/fanfic/get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: READ_FANFIC, payload });
      });
  };
};

export const saveFanfic = (
  id,
  title,
  tags,
  category,
  shortDescr,
  userId,
  chapters,
  images,
  stars
) => {
  return (dispatch, getState) => {
    fetch('/api/fanfic/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        title,
        tags,
        category,
        shortDescr,
        userId,
        chapters,
        images,
        stars
      })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: SAVE_FANFIC, payload });
      });
  };
};

export const saveTags = tags => {
  return (dispatch, getState) => {
    fetch('/api/tags/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tags })
    })
      .then(rs => rs.json())
      .then(payload => {
        return dispatch({ type: SAVE_TAGS, payload });
      });
  };
};

export const sendLike = (chapterId, change, userId) => {
  return (dispatch, getState) => {
    socket.emit('setLike', { chapterId, change, userId });
  };
};

export const updateLikes = ({ chapterId, likes }) => {
  return (dispatch, getState) => {
    return dispatch({ type: UPDATE_LIKES, payload: likes, chapterId });
  };
};

export const sendStars = (fanficId, oldRating, newRating, userId) => {
  return (dispatch, getState) => {
    socket.emit('setStar', { fanficId, oldRating, newRating, userId });
    return dispatch({ type: SAVE_OWN_VOTE, payload: newRating, fanficId });
  };
};

export const updateStars = ({ fanficId, stars }) => {
  return (dispatch, getState) => {
    return dispatch({ type: UPDATE_STARS, payload: stars, fanficId });
  };
};
