import initialState from '../initialState';
import { POST_SEARCH_QUERY } from '../types';

export default function(state = initialState.searchEntries, action) {
  if (action.type === POST_SEARCH_QUERY) {
    return {
      users: [...action.entries.users],
      tweets: [...action.entries.tweets]
    };
  }

  return state;
}
