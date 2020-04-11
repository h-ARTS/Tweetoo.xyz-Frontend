import axios from 'axios';
import {
  SET_AUTHENTICATED_USER,
  SET_TWEETS,
  SET_REPLIES,
  SET_AUTHENTICATED,
  LOADING_UI,
  DATA_FETCH_COMPLETED,
  SET_LIKED_TWEETS
} from '../types';

export const fetchAllData = () => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  const getAllTweets = () => axios.get('/api/tweets');
  const getAllLikedTweets = () => axios.get('/api/tweet/liked');
  const getAllReplies = () => axios.get('/api/replies');
  const getCurrentUser = () => axios.get(`/api/user`);
  axios
    .all([
      getCurrentUser(),
      getAllTweets(),
      getAllReplies(),
      getAllLikedTweets()
    ])
    .then(
      axios.spread((currentUser, tweets, replies, likedTweets) => {
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
        dispatch({
          type: SET_LIKED_TWEETS,
          liked: likedTweets.data
        });
        dispatch({ type: DATA_FETCH_COMPLETED });
      })
    );
};
