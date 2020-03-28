import {
  UPDATE_SIGNUP_FORM_DATA,
  SUBMIT_SIGNUP_FORM_DATA,
  UPLOAD_USER_IMAGE_FORM_DATA,
  RESET_SIGNUP_FORM
} from '../types';

const initialState = {
  email: '',
  password: '',
  fullName: '',
  userHandle: '',
  bio: '',
  website: '',
  location: '',
  userImage: null
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
      userImage: action.image
    };
  }

  if (action.type === RESET_SIGNUP_FORM) {
    return initialState;
  }

  return state;
}
