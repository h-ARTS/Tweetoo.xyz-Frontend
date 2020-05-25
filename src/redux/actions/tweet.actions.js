import axios from 'axios';
import {
  POST_TWEET,
  SET_AUTHENTICATED_USER,
  DELETE_TWEET,
  LIKE_TWEET,
  UNLIKE_TWEET,
  POST_RETWEET,
  DELETE_RETWEET,
  UPDATE_TWEET_ENTRIES,
  UPLOAD_TWEET_IMAGES_FOR_CACHE,
  SAVE_UNIQUE_TWEET_IMAGE_IDS,
  CLEAR_CACHED_TWEET_IMAGES
} from '../types';
import isLikedPipe from '../../common/utils/isLikedPipe';
import isRetweetPipe from '../../common/utils/isRetweetPipe';

export const postTweet = data => async dispatch => {
  try {
    const response = await axios.post('/api/tweet', data);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: POST_TWEET,
      tweet: response.data.tweet
    });
    dispatch({
      type: SET_AUTHENTICATED_USER,
      user: response.data.user
    });
    dispatch({
      type: CLEAR_CACHED_TWEET_IMAGES
    });
  } catch (err) {
    throw err;
  }
};

export const postRetweet = (tweetId, retweet = true) => async dispatch => {
  try {
    const response = retweet
      ? await axios.post(`/api/tweet/${tweetId}/retweet`)
      : await axios.delete(`/api/tweet/${tweetId}/undoretweet`);

    if (!response) {
      throw new Error(response);
    }

    if (retweet) {
      dispatch({
        type: POST_RETWEET,
        tweet: response.data.doc
      });
      dispatch({
        type: SET_AUTHENTICATED_USER,
        user: response.data.user
      });
    } else {
      dispatch({
        type: DELETE_RETWEET,
        tweet: response.data.doc
      });
      dispatch({
        type: SET_AUTHENTICATED_USER,
        user: response.data.user
      });
    }
  } catch (err) {
    throw err;
  }
};

export const handleLikeTweet = (tweetId, type) => async dispatch => {
  try {
    const response = await axios.put(`/api/tweet/${tweetId}/${type}`);

    if (!response) {
      throw new Error(response);
    }

    if (type === 'like') {
      dispatch({
        type: LIKE_TWEET,
        tweet: response.data.doc
      });
    } else {
      dispatch({
        type: UNLIKE_TWEET,
        tweet: response.data.doc
      });
    }
  } catch (err) {
    throw err;
  }
};

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

    console.log(response.data);
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

export const updateTweetEntries = (data, user) => async dispatch => {
  let results = await isLikedPipe(data);
  results = isRetweetPipe(results, user);
  dispatch({
    type: UPDATE_TWEET_ENTRIES,
    entries: [...results]
  });
};

export const deleteTweet = tweetId => async dispatch => {
  try {
    const response = await axios.delete(`/api/tweet/${tweetId}`);

    if (!response) {
      throw new Error(response);
    }

    dispatch({
      type: DELETE_TWEET,
      removed: response.data.removed
    });
    dispatch({
      type: SET_AUTHENTICATED_USER,
      user: response.data.user
    });
  } catch (err) {
    throw err;
  }
};
