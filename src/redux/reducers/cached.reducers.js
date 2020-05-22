import initialState from '../initialState';
import {
  SAVE_UNIQUE_TWEET_IMAGE_IDS,
  UPLOAD_TWEET_IMAGES_FOR_CACHE,
  REMOVE_CACHED_IMAGE
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

  if (action.type === REMOVE_CACHED_IMAGE) {
    const filteredOutCacheImages = state.newTweetImages.filter(
      image => image._id !== action.imageId
    );
    const filteredOutImageId = state.newTweetImageIds.filter(
      id => id !== action.imageId
    );

    return {
      ...state,
      newTweetImageIds: filteredOutImageId,
      newTweetImages: filteredOutCacheImages
    };
  }

  return state;
}
