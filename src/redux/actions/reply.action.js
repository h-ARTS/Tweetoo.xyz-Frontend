import axios from 'axios';
import {
  POST_REPLY,
  SET_AUTHENTICATED_USER,
  UPDATE_TWEET,
  SET_REPLIES,
  LOADING_REPLIES,
  DATA_FETCH_COMPLETED,
  DELETE_REPLY
} from '../types';

export const getReplies = tweetId => async dispatch => {
  dispatch({
    type: LOADING_REPLIES
  });
  try {
    const response = await axios.get(`/api/reply/${tweetId}`);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: DATA_FETCH_COMPLETED
    });
    dispatch({
      type: SET_REPLIES,
      replies: response.data
    });
  } catch (err) {
    throw err;
  }
};

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

export const deleteReply = replyId => async dispatch => {
  try {
    const response = await axios.delete(`/api/reply?replyId=${replyId}`);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: DELETE_REPLY,
      reply: response.data.removed
    });
  } catch (err) {
    throw err;
  }
};
