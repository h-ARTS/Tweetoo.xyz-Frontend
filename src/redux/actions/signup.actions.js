import axios from 'axios';
import { navigate } from '@reach/router';
import setAuthorizationHeader from '../../common/utils/setAuthorizationHeader';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  UPDATE_SIGNUP_FORM_DATA,
  UPLOAD_USER_IMAGE_FORM_DATA,
  UPDATE_PASSWORD_STRENGTH
} from '../types';
import { fetchAllData } from './data.actions';

export const updateFormData = data => dispatch => {
  dispatch({
    type: UPDATE_SIGNUP_FORM_DATA,
    data
  });
};

export const submitSignupForm = data => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', data)
    .then(res => {
      setAuthorizationHeader(res.data);
      dispatch({ type: CLEAR_ERRORS });
      dispatch(fetchAllData());
      navigate('/home');
    })
    .catch(err => console.error(err));
};

export const uploadCachedProfileImage = data => dispatch => {
  dispatch({ type: LOADING_UI });
  const formData = new FormData();
  formData.append('image', data.file);
  formData.append('handle', data.userHandle);
  formData.append('dimension', 'userImage');
  const config = {
    headers: {
      'content-type': `multipart/form-data; boundary=${formData._boundary}`
    }
  };
  axios
    .post('/media/cached/newuser', formData, config)
    .then(res => {
      dispatch({
        type: UPLOAD_USER_IMAGE_FORM_DATA,
        userImage: res.data.cached.path
      });
    })
    .catch(err => console.error(err));
};

export const updatePasswordStrength = value => ({
  type: UPDATE_PASSWORD_STRENGTH,
  value
});
