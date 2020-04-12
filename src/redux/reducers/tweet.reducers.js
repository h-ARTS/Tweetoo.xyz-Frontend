import { SET_TWEETS, POST_TWEET } from '../types';

export default function(state = {}, action) {
  if (action.type === SET_TWEETS) {
    return [...state, ...action.tweets];
  }

  if (action.type === POST_TWEET) {
    return [...state, action.tweet];
  }

  return state;
}
