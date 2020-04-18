import { POST_REPLY, SET_REPLIES, CLEAR_REPLIES, DELETE_REPLY } from '../types';
import initialState from '../initialState';

export default function(state = initialState, action) {
  if (action.type === SET_REPLIES) {
    return action.replies;
  }

  if (action.type === POST_REPLY) {
    return [...state, action.reply];
  }

  if (action.type === CLEAR_REPLIES) {
    return [];
  }

  if (action.type === DELETE_REPLY) {
    const filtered = state.filter(reply => {
      return reply._id !== action.reply._id;
    });
    return filtered;
  }

  return state;
}
