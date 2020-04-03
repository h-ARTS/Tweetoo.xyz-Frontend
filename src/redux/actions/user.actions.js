import axios from 'axios';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_UNAUTHENTICATED
} from '../types';
import { fetchAllData } from './data.actions';
import { navigate } from '@reach/router';

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  navigate('/');
};

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
        action: err.response
      });
    });
};

};
