import { DATA_FETCH_COMPLETED, LOADING_UI } from '../types';

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

  return state;
}
