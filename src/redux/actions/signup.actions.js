import axios from 'axios';
import { navigate } from '@reach/router';
import setAuthorizationHeader from '../../common/utils/setAuthorizationHeader';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  UPDATE_SIGNUP_FORM_DATA,
  UPLOAD_CACHED_USER_IMAGE,
  UPDATE_PASSWORD_STRENGTH,
  SAVE_UNIQUE_IMAGE_ID
} from '../types';
import { fetchAllData } from './data.actions';

export const updateFormData = data => dispatch => {
  dispatch({
    type: UPDATE_SIGNUP_FORM_DATA,
    data
  });
};

export const submitSignupForm = data => async dispatch => {
  dispatch({ type: LOADING_UI });
  const userImageBody = {
    handle: data.handle,
    uniqueImageId: data.uniqueImageId
  };
  try {
    const signUpResponse = await axios.post('/signup', data);
    if (!signUpResponse) {
      throw new Error(signUpResponse);
    } else {
      setAuthorizationHeader(signUpResponse.data);
    }

    const createNewUserDirResponse = await axios.get(
      `/media/user/${data.handle}`
    );
    if (!createNewUserDirResponse) {
      throw new Error(createNewUserDirResponse);
    }

    const assignUserImageResponse = await axios.put(
      '/media/cached',
      userImageBody
    );
    if (!assignUserImageResponse) {
      throw new Error(assignUserImageResponse);
    } else {
      dispatch(fetchAllData());
      dispatch({ type: CLEAR_ERRORS });
      navigate('/home');
    }
  } catch (err) {
    throw err;
  }
};

export const uploadCachedProfileImage = data => async dispatch => {
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
  try {
    const cachedImageApiResponse = await axios.post(
      '/media/cached/newuser',
      formData,
      config
    );

    if (!cachedImageApiResponse) {
      throw new Error(cachedImageApiResponse);
    }

    const { data } = cachedImageApiResponse;
    dispatch({
      type: UPLOAD_CACHED_USER_IMAGE,
      userImage: data.cached.path
    });
    dispatch({
      type: SAVE_UNIQUE_IMAGE_ID,
      uniqueImageId: data.cached._id
    });
  } catch (err) {
    throw err;
  }
};

export const updatePasswordStrength = value => ({
  type: UPDATE_PASSWORD_STRENGTH,
  value
});
