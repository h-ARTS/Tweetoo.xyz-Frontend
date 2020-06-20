import axios from 'axios';
import { SET_BOOKMARKS, SET_IS_BOOKMARK_TO_TWEETS } from '../types';

export const getBookmarks = () => async dispatch => {
  try {
    const response = await axios.get('/api/bookmarks');

    if (!response) {
      throw new Error('getBookmarks error: ', response);
    }

    dispatch({
      type: SET_BOOKMARKS,
      bookmarks: response.data.map(bookmark => bookmark.tweetId)
    });
    dispatch({
      type: SET_IS_BOOKMARK_TO_TWEETS,
      bookmarks: response.data.map(bookmark => bookmark.tweetId)
    });
  } catch (error) {
    throw error;
  }
};
