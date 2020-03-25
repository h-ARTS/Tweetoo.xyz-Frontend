import axios from 'axios';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_UNAUTHENTICATED
} from '../types';
import { fetchAllData } from './data.actions';
import { navigate } from '@reach/router';

export const signinUser = userData => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data);
      dispatch(fetchAllData());
      dispatch({ type: CLEAR_ERRORS });
      navigate('/home');
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        action: err.response.data
      });
    });
};

const setAuthorizationHeader = token => {
  const bToken = `Bearer ${token}`;
  localStorage.setItem('token', bToken);
  axios.defaults.headers.common['Authorization'] = bToken;
};
