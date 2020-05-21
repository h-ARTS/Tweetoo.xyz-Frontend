import initialState from '../initialState';
import {
  SAVE_UNIQUE_TWEET_IMAGE_IDS,
  UPLOAD_TWEET_IMAGES_FOR_CACHE
} from '../types';

export default function(state = initialState.cached, action) {
  if (action.type === SAVE_UNIQUE_TWEET_IMAGE_IDS) {
    return {
      ...state,
      newTweetImageIds: [...action.uniqueTweetImageIds]
    };
  }

  if (action.type === UPLOAD_TWEET_IMAGES_FOR_CACHE) {
    return {
      ...state,
      newTweetImages: [].concat(action.images)
    };
  }

  return state;
}
