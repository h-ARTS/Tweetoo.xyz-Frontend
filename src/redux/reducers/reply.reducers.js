import { POST_REPLY } from '../types';
import initialState from '../initialState';

export default function(state = initialState, action) {
  if (action.type === POST_REPLY) {
    return [...state, action.reply];
  }

  return state;
}
