import axios from 'axios';
import {
  UPLOAD_TWEET_IMAGES_FOR_CACHE,
  SAVE_UNIQUE_TWEET_IMAGE_IDS
} from '../types';

export const uploadTweetImagesForCache = files => async dispatch => {
  const formData = new FormData();
  for (let file of files) {
    formData.append(file.name, file);
  }
  const config = {
    headers: {
      'content-type': `multipart/form-data; boundary=${formData._boundary}`
    }
  };
  try {
    if (formData.entries().length < 0)
      throw Error('No Files in FormData object!');

    const response = await axios.post(
      '/api/tweet/cache-tweet-image',
      formData,
      config
    );

    if (!response) throw Error(response);

    dispatch({
      type: UPLOAD_TWEET_IMAGES_FOR_CACHE,
      images: response.data
    });
    dispatch({
      type: SAVE_UNIQUE_TWEET_IMAGE_IDS,
      uniqueTweetImageIds: response.data.map(function getId(file) {
        return file._id;
      })
    });
  } catch (error) {
    throw error;
  }
};
