import {
  DATA_FETCH_COMPLETED,
  LOADING_UI,
  PROFILE_TAB_CHANGE,
  LOADING_REPLIES
} from '../types';

export default function(state = {}, action) {
  if (action.type === LOADING_UI) {
    return {
      ...state,
      loading: true
    };
  }

  if (action.type === LOADING_REPLIES) {
    return {
      ...state,
      loadingReplies: true
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

  return state;
}
