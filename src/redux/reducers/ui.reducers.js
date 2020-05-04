import {
  DATA_FETCH_COMPLETED,
  LOADING_UI,
  LOADING_COMPLETE,
  PROFILE_TAB_CHANGE,
  LOADING_REPLIES,
  LOADING_USERS,
  USERS_FETCH_COMPLETED,
  SET_ERRORS,
  CLEAR_ERRORS
} from '../types';

export default function(state = {}, action) {
  if (action.type === LOADING_UI) {
    return {
      ...state,
      loading: true
    };
  }

  if (action.type === LOADING_COMPLETE) {
    return {
      ...state,
      loading: false
    };
  }

  if (action.type === LOADING_REPLIES) {
    return {
      ...state,
      loadingReplies: true
    };
  }

  if (action.type === LOADING_USERS) {
    return {
      ...state,
      loadingUsers: true
    };
  }

  if (action.type === USERS_FETCH_COMPLETED) {
    return {
      ...state,
      loadingUsers: false
    };
  }

  if (action.type === DATA_FETCH_COMPLETED) {
    return {
      ...state,
      loading: false,
      loadingReplies: false
    };
  }

  if (action.type === PROFILE_TAB_CHANGE) {
    return {
      ...state,
      profile: {
        tabValue: action.tabValue
      }
    };
  }

  if (action.type === SET_ERRORS) {
    return {
      ...state,
      errors: action.error
    };
  }

  if (action.type === CLEAR_ERRORS) {
    return {
      ...state,
      errors: null
    };
  }

  return state;
}
