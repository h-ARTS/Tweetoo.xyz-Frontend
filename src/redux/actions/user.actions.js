import axios from 'axios';
import { navigate } from '@reach/router';
import setAuthorizationHeader from '../../common/utils/setAuthorizationHeader';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_USER,
  SET_UNAUTHENTICATED,
  UPLOAD_USER_IMAGE,
  UPLOAD_COVER_IMAGE,
  UPDATE_USER_DATA,
  CLEAR_STATE,
  SET_AUTHENTICATED_USER,
  SET_FOLLOWERS,
  SET_FOLLOWING,
  LOADING_USERS,
  USERS_FETCH_COMPLETED,
  LOADING_COMPLETE
} from '../types';
import { fetchAllData } from './data.actions';

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  axios
    .post('/logout')
    .then(res => {
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: SET_UNAUTHENTICATED });
      dispatch({ type: CLEAR_STATE });
      navigate('/');
    })
    .catch(reason => console.error(reason));
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
        error: err.response.data
      });
      dispatch({ type: LOADING_COMPLETE });
    });
};

export const imageUpload = imageData => async dispatch => {
  const formData = new FormData();
  formData.append('image', imageData.file);
  formData.append('handle', imageData.handle);
  formData.append('dimension', imageData.dimension);
  const config = {
    headers: {
      'content-type': `multipart/form-data; boundary=${formData._boundary}`
    }
  };

  try {
    const response = await axios.post(
      `/api/user/${imageData.handle}/image`,
      formData,
      config
    );

    if (!response) {
      throw new Error('Upload Image exception: ', response);
    }

    const { name, type, url, _id } = response.data[imageData.dimension];

    if (imageData.dimension === 'userImage') {
      return dispatch({
        type: UPLOAD_USER_IMAGE,
        userImage: { _id, name, type, url }
      });
    } else {
      return dispatch({
        type: UPLOAD_COVER_IMAGE,
        coverImage: { _id, name, type, url }
      });
    }
  } catch (err) {
    throw err;
  }
};

export const getUser = handle => async dispatch => {
  try {
    const response = await axios.get(`/api/user/${handle}`);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: SET_USER,
      user: response.data
    });
  } catch (err) {
    throw err;
  }
};

export const getUsers = (handles, options) => async dispatch => {
  dispatch({
    type: LOADING_USERS
  });
  const commatizedQuery = handles.join(',');
  try {
    const response = await axios.get(`/api/users?handles=${commatizedQuery}`);

    const dispatches = {
      ['followers' || 'followers_watching']: dispatch({
        type: SET_FOLLOWERS,
        followers: response.data
      }),
      ['following' || 'following_watching']: dispatch({
        type: SET_FOLLOWING,
        following: response.data
      })
    };

    dispatch({
      type: USERS_FETCH_COMPLETED
    });
    return dispatches[options.type];
  } catch (err) {
    throw err;
  }
};

export const updateUserData = data => async dispatch => {
  try {
    const response = await axios.put('/api/user', data);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: UPDATE_USER_DATA,
      data: response.data
    });
  } catch (err) {
    throw err;
  }
};

export const updateFollower = (handle, follow = false) => async dispatch => {
  try {
    const response = await axios.put(`/api/user/${handle}?follow=${follow}`);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: SET_USER,
      user: response.data.target
    });
    dispatch({
      type: SET_AUTHENTICATED_USER,
      user: response.data.updated
    });
  } catch (err) {
    throw err;
  }
};
