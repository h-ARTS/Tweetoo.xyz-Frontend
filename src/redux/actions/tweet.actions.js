import axios from 'axios';
import { POST_TWEET, SET_AUTHENTICATED_USER, DELETE_TWEET } from '../types';

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
