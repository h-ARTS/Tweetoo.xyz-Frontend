import {
  UPDATE_SIGNUP_FORM_DATA,
  SUBMIT_SIGNUP_FORM_DATA,
  UPLOAD_USER_IMAGE_FORM_DATA,
  RESET_SIGNUP_FORM,
  UPDATE_PASSWORD_STRENGTH,
  SAVE_UNIQUE_IMAGE_ID
} from '../types';

const initialState = {
  email: '',
  password: '',
  fullName: '',
  userHandle: '',
  bio: '',
  website: '',
  location: '',
  userImage: null,
  uniqueImageId: null,
  passwordStrength: 0
};
export default function(state = initialState, action) {
  if (action.type === UPDATE_SIGNUP_FORM_DATA) {
    return {
      ...state,
      ...action.data
    };
  }

  if (action.type === SUBMIT_SIGNUP_FORM_DATA) {
    return action.data;
  }

  if (action.type === UPLOAD_USER_IMAGE_FORM_DATA) {
    return {
      ...state,
      userImage: action.userImage
    };
  }

  if (action.type === UPDATE_PASSWORD_STRENGTH) {
    if (state.passwordStrength !== action.value) {
      return {
        ...state,
        passwordStrength: action.value
      };
    }
  }

  if (action.type === SAVE_UNIQUE_IMAGE_ID) {
    return {
      ...state,
      uniqueImageId: action.uniqueImageId
    };
  }

  if (action.type === RESET_SIGNUP_FORM) {
    return initialState;
  }

  return state;
}
