import axios from 'axios';
import {
  SET_AUTHENTICATED_USER,
  SET_TWEETS,
  SET_AUTHENTICATED,
  LOADING_UI,
  DATA_FETCH_COMPLETED,
  POST_SEARCH_QUERY
} from '../types';
import { getNotifications } from './notifications.actions';
import { getBookmarks } from './bookmarks.action';

export const fetchAllData = () => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  const getAllTweets = () => axios.get('/api/tweets');
  const getAllLikedTweets = () => axios.get('/api/tweet/liked');
  const getCurrentUser = () => axios.get(`/api/user`);
  axios.all([getCurrentUser(), getAllLikedTweets(), getAllTweets()]).then(
    axios.spread((currentUser, likedTweets, tweets) => {
      let filteredTweets = tweets.data.map(function(tweet) {
        tweet.isLiked = false;
        this.forEach(liked => {
          if (liked._id === tweet._id) {
            tweet.isLiked = true;
          }
        });
        return tweet;
      }, likedTweets.data);
      filteredTweets = filteredTweets.map(function(tweet) {
        tweet.isRetweet = false;
        this.forEach(userTweet => {
          if (userTweet.tweetId === tweet._id && userTweet.retweet) {
            tweet.isRetweet = true;
          }
        });
        return tweet;
      }, currentUser.data.tweets);
      dispatch({
        type: SET_AUTHENTICATED_USER,
        user: currentUser.data
      });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({
        type: SET_TWEETS,
        tweets: filteredTweets
      });
      dispatch(getNotifications());
      dispatch(getBookmarks());
      dispatch({ type: DATA_FETCH_COMPLETED });
    })
  );
};

export const searchQuery = word => async dispatch => {
  try {
    const response = await axios.get(`/api/search?entry=${word}`);

    dispatch({
      type: POST_SEARCH_QUERY,
      entries: {
        users: response.data.users,
        tweets: response.data.tweets
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};
