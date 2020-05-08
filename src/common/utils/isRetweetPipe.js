import store from '../../redux/store';

export default function isRetweetPipe(data) {
  const { user } = store.getState();

  return data.map(function(tweet) {
    tweet.isRetweet = false;
    this.forEach(userTweet => {
      if (userTweet.tweetId === tweet._id && userTweet.retweet) {
        tweet.isRetweet = true;
      }
    });
    return tweet;
  }, user.current.tweets);
}
