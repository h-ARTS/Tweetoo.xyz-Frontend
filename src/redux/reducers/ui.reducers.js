import { DATA_FETCH_COMPLETED, LOADING_UI, PROFILE_TAB_CHANGE } from '../types';

export default function(state = {}, action) {
  if (action.type === LOADING_UI) {
    return {
      ...state,
      loading: true
    };
  }

  if (action.type === DATA_FETCH_COMPLETED) {
    return {
      ...state,
      loading: false
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
