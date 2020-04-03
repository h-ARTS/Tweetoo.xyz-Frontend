import axios from 'axios';
import {
  SET_AUTHENTICATED_USER,
  SET_TWEETS,
  SET_REPLIES,
  SET_AUTHENTICATED,
  LOADING_UI,
  DATA_FETCH_COMPLETED
} from '../types';

export const fetchAllData = user => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  const getAllTweets = () => axios.get('/api/tweets');
  const getAllReplies = () => axios.get('/api/replies');
  const getCurrentUser = () => axios.get(`/api/user/${user.handle}`);
  axios.all([getCurrentUser(), getAllTweets(), getAllReplies()]).then(
    axios.spread((currentUser, tweets, replies) => {
      dispatch({
        type: SET_AUTHENTICATED_USER,
        user: currentUser.data.data
      });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({
        type: SET_TWEETS,
        tweets
      });
      dispatch({
        type: SET_REPLIES,
        replies
      });
      dispatch({ type: DATA_FETCH_COMPLETED });
    })
  );
};
