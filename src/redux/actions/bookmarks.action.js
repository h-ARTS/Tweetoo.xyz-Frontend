import axios from 'axios';
import { SET_BOOKMARKS, POST_BOOKMARK, SET_IS_BOOKMARK } from '../types';

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
      type: SET_IS_BOOKMARK,
      bookmarks: response.data.map(bookmark => bookmark.tweetId)
    });
  } catch (error) {
    throw error;
  }
};

export const createBookmark = tweetId => async dispatch => {
  const postBody = { tweetId };
  try {
    const response = await axios.post('/api/bookmarks', postBody);

    if (!response) {
      throw new Error('createBookmarks error: ', response);
    }

    dispatch({
      type: POST_BOOKMARK,
      tweetId: response.data.tweetId
    });
  } catch (error) {
    throw error;
  }
};
    });
  } catch (error) {
    throw error;
  }
};
