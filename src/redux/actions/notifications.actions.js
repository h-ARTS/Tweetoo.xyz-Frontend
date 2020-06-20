import axios from 'axios';
import { SET_NOTIFICATIONS } from '../types';

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
