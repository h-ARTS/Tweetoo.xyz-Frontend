import axios from 'axios';
import {
  SET_AUTHENTICATED_USER,
  SET_TWEETS,
  SET_REPLIES,
  SET_AUTHENTICATED,
  LOADING_UI,
  DATA_FETCH_COMPLETED
} from '../types';

export const fetchAllData = () => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  const getAllTweets = () => axios.get('/api/tweets');
  const getAllLikedTweets = () => axios.get('/api/tweet/liked');
  const getAllReplies = () => axios.get('/api/replies');
  const getCurrentUser = () => axios.get(`/api/user`);
  axios
    .all([
      getCurrentUser(),
      getAllLikedTweets(),
      getAllTweets(),
      getAllReplies()
    ])
    .then(
      axios.spread((currentUser, likedTweets, tweets, replies) => {
        const filterTweetsForLikes = tweets.data.data.map(function(tweet) {
          tweet.isLiked = false;
          this.forEach(liked => {
            if (liked._id === tweet._id) {
              tweet.isLiked = true;
            }
          });
          return tweet;
        }, likedTweets.data);
        console.table(filterTweetsForLikes);
        dispatch({
          type: SET_AUTHENTICATED_USER,
          user: currentUser.data.data
        });
        dispatch({ type: SET_AUTHENTICATED });
        dispatch({
          type: SET_TWEETS,
          tweets: filterTweetsForLikes
        });
        dispatch({
          type: SET_REPLIES,
          replies: replies.data.data
        });
        dispatch({ type: DATA_FETCH_COMPLETED });
      })
    );
};
