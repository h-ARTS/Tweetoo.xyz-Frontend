import initialState from '../initialState';
import { SET_NOTIFICATIONS, UPADTE_NOTIFICATIONS_READ } from '../types';

export default function(state = initialState.notifications, action) {
  if (action.type === SET_NOTIFICATIONS) {
    return action.notifications;
  }

  if (action.type === UPADTE_NOTIFICATIONS_READ) {
    const updated = state.map(notification => {
      notification = { ...notification, ...action.updates };
      return notification;
    });
    return updated;
  }

  return state;
}
