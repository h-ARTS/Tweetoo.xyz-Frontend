import axios from 'axios';
import { POST_TWEET, SET_AUTHENTICATED_USER } from '../types';

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
