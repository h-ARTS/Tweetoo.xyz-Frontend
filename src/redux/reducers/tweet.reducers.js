import { SET_TWEETS, POST_TWEET, DELETE_TWEET } from '../types';

export default function(state = {}, action) {
  if (action.type === SET_TWEETS) {
    return [...state, ...action.tweets];
  }

  if (action.type === POST_TWEET) {
    return [...state, action.tweet];
  }

  if (action.type === DELETE_TWEET) {
    const removedFiltered = state.filter(
      tweet => tweet._id !== action.removed._id
    );
    return [...removedFiltered];
  }

  return state;
}
