import { SET_TWEETS } from '../types';

export default function(state = {}, action) {
  if (action.type === SET_TWEETS) {
    return [...state, ...action.tweets];
  }
  return state;
}
