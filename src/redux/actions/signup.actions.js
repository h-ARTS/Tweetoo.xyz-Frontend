import axios from 'axios';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  UPDATE_SIGNUP_FORM_DATA,
  UPLOAD_USER_IMAGE_FORM_DATA,
  UPDATE_PASSWORD_STRENGTH
} from '../types';

export const updateFormData = data => dispatch => {
  dispatch({
    type: UPDATE_SIGNUP_FORM_DATA,
    data
  });
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
      console.log(res);
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
