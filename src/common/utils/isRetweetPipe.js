export default function isRetweetPipe(data, user) {
  return data.map(function(tweet) {
    tweet.isRetweet = false;
    this.forEach(userTweet => {
      if (userTweet.tweetId === tweet._id && userTweet.retweet) {
        tweet.isRetweet = true;
      }
    });
    return tweet;
  }, user.tweets);
}
