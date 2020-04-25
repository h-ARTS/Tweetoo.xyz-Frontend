import initialState from '../initialState';
import { SET_NOTIFICATIONS, UPADTE_NOTIFICATIONS_READ } from '../types';

export default function(state = initialState.notifications, action) {
  if (action.type === SET_NOTIFICATIONS) {
    return action.notifications;
  }

  if (action.type === UPADTE_NOTIFICATIONS_READ) {
    return action.updates;
  }

  return state;
}
