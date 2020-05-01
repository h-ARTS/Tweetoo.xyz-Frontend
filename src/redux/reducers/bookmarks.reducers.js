import initialState from '../initialState';
import { SET_BOOKMARKS, POST_BOOKMARK, DELETE_BOOKMARK } from '../types';

export default function(state = initialState.bookmarks, action) {
  if (action.type === SET_BOOKMARKS) {
    return action.bookmarks;
  }

  if (action.type === POST_BOOKMARK) {
    return [...state, action.tweetId];
  }

  if (action.type === DELETE_BOOKMARK) {
    const filteredOutBookmark = state.filter(tweetId => {
      return tweetId === action.removed.tweetId;
    });

    return [...filteredOutBookmark];
  }

  return state;
}
