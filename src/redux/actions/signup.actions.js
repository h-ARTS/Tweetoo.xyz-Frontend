import {
  UPDATE_SIGNUP_FORM_DATA,
  LOADING_UI,
  CLEAR_ERRORS,
  UPLOAD_USER_IMAGE_FORM_DATA
} from '../types';
import axios from 'axios';

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
  formData.append('handle', data.handle);
  formData.append('dimension', 'userImage');
  const config = {
    headers: {
      'content-type': `multipart/form-data; boundary=${formData._boundary}`
    }
  };
  axios.post(`/api/cached/newuser`, formData, config).then(res => {
    dispatch({
      type: UPLOAD_USER_IMAGE_FORM_DATA,
      userImage: res.data.cached
    });
  });
};
