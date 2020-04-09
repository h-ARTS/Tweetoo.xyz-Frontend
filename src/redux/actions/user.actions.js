import axios from 'axios';
import { navigate } from '@reach/router';
import setAuthorizationHeader from '../../common/utils/setAuthorizationHeader';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  UPLOAD_USER_IMAGE,
  UPLOAD_COVER_IMAGE,
  UPDATE_USER_DATA
} from '../types';
import { fetchAllData } from './data.actions';

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

export const updateUserData = data => async dispatch => {
  try {
    const response = await axios.put('/api/user', data);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: UPDATE_USER_DATA,
      data
    });
  } catch (err) {
    throw err;
  }
};
