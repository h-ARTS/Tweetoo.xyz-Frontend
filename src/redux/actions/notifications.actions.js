import axios from 'axios';
import { SET_NOTIFICATIONS, UPADTE_NOTIFICATIONS_READ } from '../types';

export const getNotifications = () => async dispatch => {
  try {
    const response = await axios.get('/api/notifications');

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: SET_NOTIFICATIONS,
      notifications: response.data
    });
  } catch (err) {
    throw err;
  }
};

export const markAllRead = () => async dispatch => {
  const putBody = { read: true };
  try {
    const response = await axios.put('/api/notifications', putBody);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: UPADTE_NOTIFICATIONS_READ,
      updates: response.data
    });
  } catch (err) {
    throw err;
  }
};
