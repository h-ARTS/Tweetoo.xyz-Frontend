import {
  SET_AUTHENTICATED_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  UPLOAD_USER_IMAGE,
  UPDATE_USER_DATA
} from '../types';

export default function(state = {}, action) {
  if (action.type === SET_AUTHENTICATED_USER) {
    return action.user;
  }

  if (action.type === SET_UNAUTHENTICATED) {
    return {
      ...state,
      authenticated: false
    };
  }

  if (action.type === SET_AUTHENTICATED) {
    return {
      ...state,
      authenticated: true
    };
  }

  if (action.type === UPLOAD_USER_IMAGE) {
    return {
      ...state,
      coverImage: action.coverImage,
      userImage: action.userImage
    };
  }

  if (action.type === UPDATE_USER_DATA) {
    return {
      ...state,
      ...action.data
    };
  }

  return state;
}
