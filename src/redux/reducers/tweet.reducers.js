import {
  SET_TWEETS,
  POST_TWEET,
  DELETE_TWEET,
  LIKE_TWEET,
  UNLIKE_TWEET,
  CLEAR_STATE,
  POST_RETWEET,
  DELETE_RETWEET,
  UPDATE_TWEET,
  SET_IS_BOOKMARK
} from '../types';

export default function(state = [], action) {
  if (action.type === SET_TWEETS) {
    const filterOutOldTweets = state.filter(function(tweet) {
      return this.forEach(t => {
        return t._id === tweet._id;
      });
    }, action.tweets);
    return [...filterOutOldTweets, ...action.tweets];
  }

  if (action.type === POST_TWEET) {
    return [...state, action.tweet];
  }

  if (action.type === LIKE_TWEET) {
    if (!action.tweet.isLiked) {
      action.tweet.isLiked = true;
    }
    const filtered = state.filter(tweet => tweet._id !== action.tweet._id);
    return [...filtered, action.tweet];
  }

  if (
    action.type === POST_RETWEET ||
    action.type === UPDATE_TWEET ||
    action.type === DELETE_RETWEET
  ) {
    const isLiked = state.filter(tweet => tweet.isLiked && true);
    const filtered = state.filter(tweet => tweet._id !== action.tweet._id);

    action.tweet.isLiked = isLiked;
    action.tweet.isRetweet = action.type === POST_RETWEET && true;
    return [...filtered, action.tweet];
  }

  if (action.type === SET_IS_BOOKMARK) {
    const filteredTweets = state.map(function(tweet) {
      tweet.isBookmark = false;
      this.forEach(tweetId => {
        if (tweetId === tweet._id) {
          tweet.isBookmark = true;
        }
      });
      return tweet;
    }, action.bookmarks);

    return [...filteredTweets];
  }

  if (action.type === UNLIKE_TWEET) {
    if (action.tweet.isLiked) {
      action.tweet.isLiked = false;
    }
    const filtered = state.filter(tweet => tweet._id !== action.tweet._id);
    return [...filtered, action.tweet];
  }

  if (action.type === DELETE_TWEET) {
    const removedFiltered = state.filter(
      tweet => tweet._id !== action.removed._id
    );
    return [...removedFiltered];
  }

  if (action.type === CLEAR_STATE) {
    return [];
  }

  return state;
}
