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
import isLikedPipe from '../../common/utils/isLikedPipe';
import isRetweetPipe from '../../common/utils/isRetweetPipe';

export const fetchAllData = () => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  const getAllTweets = () => axios.get('/api/tweets');
  const getCurrentUser = () => axios.get(`/api/user`);
  axios.all([getCurrentUser(), getAllTweets()]).then(
    axios.spread(async (currentUser, tweets) => {
      let filteredTweets = await isLikedPipe(tweets.data);
      filteredTweets = isRetweetPipe(filteredTweets, currentUser.data);
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
  if (word.charAt(0) === '#') {
    word = word.substring(1);
  }
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
    throw error;
  }
};
