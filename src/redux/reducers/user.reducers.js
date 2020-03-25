import {
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED
} from '../types';
export default function(state = {}, action) {

  if (action.type === SET_UNAUTHENTICATED) {
    return state;
  }

  if (action.type === SET_AUTHENTICATED) {
    return {
      ...state,
      authenticated: true
    };
  }
  return state;
}
