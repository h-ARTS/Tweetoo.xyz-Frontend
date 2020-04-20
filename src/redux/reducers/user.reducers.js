import {
  SET_AUTHENTICATED_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  UPLOAD_USER_IMAGE,
  UPLOAD_COVER_IMAGE,
  UPDATE_USER_DATA,
  CLEAR_STATE,
  SET_USER,
  CLEAR_USER,
  SET_FOLLOWING,
  SET_FOLLOWERS
} from '../types';
import initialState from '../initialState';

export default function(state = {}, action) {
  if (action.type === SET_AUTHENTICATED_USER) {
    let filteredFollowers = action.user.followers;
    let filteredFollowing = action.user.following;
    if (filteredFollowing.length > 0) {
      filteredFollowing = filteredFollowing.map(user => user.handle);
    }
    if (filteredFollowers.length > 0) {
      filteredFollowers = filteredFollowers.map(user => user.handle);
    }
    return {
      ...state,
      current: {
        ...action.user,
        following: filteredFollowing,
        followers: filteredFollowers
      }
    };
  }

  if (action.type === SET_UNAUTHENTICATED) {
    return {
      ...state,
      current: { ...state.current, authenticated: false }
    };
  }

  if (action.type === SET_AUTHENTICATED) {
    return {
      ...state,
      current: { ...state.current, authenticated: true }
    };
  }

  if (action.type === SET_USER) {
    let filteredFollowers = action.user.followers;
    let filteredFollowing = action.user.following;
    if (filteredFollowing.length > 0) {
      filteredFollowing = filteredFollowing.map(user => user.handle);
    }
    if (filteredFollowers.length > 0) {
      filteredFollowers = filteredFollowers.map(user => user.handle);
    }

    return {
      ...state,
      watching: {
        ...action.user,
        following: filteredFollowing,
        followers: filteredFollowers
      }
    };
  }

  if (action.type === SET_FOLLOWERS) {
    return {
      ...state,
      followers: action.followers
    };
  }

  if (action.type === SET_FOLLOWING) {
    return {
      ...state,
      following: action.following
    };
  }

  if (action.type === UPLOAD_USER_IMAGE) {
    return {
      ...state,
      current: { ...state.current, userImage: action.userImage }
    };
  }

  if (action.type === UPLOAD_COVER_IMAGE) {
    return {
      ...state,
      current: { ...state.current, coverImage: action.coverImage }
    };
  }

  if (action.type === UPDATE_USER_DATA) {
    return {
      ...state,
      current: { ...action.data }
    };
  }

  if (action.type === CLEAR_USER) {
    return {
      ...state,
      watching: initialState.user.watching
    };
  }

  if (action.type === CLEAR_STATE) {
    return initialState.user;
  }

  return state;
}
