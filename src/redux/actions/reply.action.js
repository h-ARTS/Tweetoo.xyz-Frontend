import axios from 'axios';
import { POST_REPLY, SET_AUTHENTICATED_USER, UPDATE_TWEET } from '../types';

export const postReply = (fullText, tweetId) => async dispatch => {
  try {
    const response = await axios.post(`/api/reply?tweetId=${tweetId}`, {
      fullText
    });

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: POST_REPLY,
      reply: response.data.reply
    });
    dispatch({
      type: UPDATE_TWEET,
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
