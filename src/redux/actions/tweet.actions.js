import axios from 'axios';
import {
  POST_TWEET,
  SET_AUTHENTICATED_USER,
  DELETE_TWEET,
  LIKE_TWEET,
  UNLIKE_TWEET
} from '../types';

export const postTweet = data => async dispatch => {
  try {
    const response = await axios.post('/api/tweet', data);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: POST_TWEET,
      tweet: response.data.tweet
    });
    dispatch({
      type: SET_AUTHENTICATED_USER,
      user: response.data.user
    });
  } catch (err) {
    throw err;
  }
};

export const deleteTweet = tweetId => async dispatch => {
  try {
    const response = await axios.delete(`/api/tweet/${tweetId}`);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: DELETE_TWEET,
      removed: response.data.removed
    });
    dispatch({
      type: SET_AUTHENTICATED_USER,
      user: response.data.user
    });
  } catch (err) {
    throw err;
  }
};

export const handleLikeTweet = (tweetId, type) => async dispatch => {
  try {
    const response = await axios.put(`/api/tweet/${tweetId}/${type}`);

    if (!response) {
      throw new Error(response);
    }

    if (type === 'like') {
      dispatch({
        type: LIKE_TWEET,
        tweet: response.data.doc
      });
    } else {
      dispatch({
        type: UNLIKE_TWEET,
        tweet: response.data.doc
      });
    }
  } catch (err) {
    throw err;
  }
};
