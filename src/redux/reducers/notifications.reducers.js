import initialState from '../initialState';
import { SET_NOTIFICATIONS } from '../types';

export default function(state = initialState.notifications, action) {
  if (action.type === SET_NOTIFICATIONS) {
    return action.notifications;
  }

  return state;
}
