import initialState from '../initialState';
import { SET_BOOKMARKS, POST_BOOKMARK } from '../types';

export default function(state = initialState.bookmarks, action) {
  if (action.type === SET_BOOKMARKS) {
    return action.bookmarks;
  }

  if (action.type === POST_BOOKMARK) {
    return [...state, action.bookmark];
  }

  return state;
}
