import axios from 'axios';
import {
  SET_AUTHENTICATED_USER,
  SET_TWEETS,
  SET_REPLIES,
  SET_AUTHENTICATED,
  LOADING_UI,
  DATA_FETCH_COMPLETED
} from '../types';

export const fetchAllData = () => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  const getAllTweets = () => axios.get('/api/tweets');
  const getAllReplies = () => axios.get('/api/replies');
  const getCurrentUser = () => axios.get(`/api/user`);
  axios.all([getCurrentUser(), getAllTweets(), getAllReplies()]).then(
    axios.spread((currentUser, tweets, replies) => {
      dispatch({
        type: SET_AUTHENTICATED_USER,
        user: currentUser.data.data
      });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({
        type: SET_TWEETS,
        tweets: tweets.data.data
      });
      dispatch({
        type: SET_REPLIES,
        replies: replies.data.data
      });
      dispatch({ type: DATA_FETCH_COMPLETED });
    })
  );
};
