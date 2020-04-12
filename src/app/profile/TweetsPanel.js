import React from 'react';
import { useSelector } from 'react-redux';
import ProfileTabPanel from './ProfileTabPanel';
import Tweet from '../home/Tweet';

export default function TweetsPanel({ value, index, userTweets }) {
  const tweets = useSelector(state => state.tweets);
  const filtered = tweets
    .filter(function(tweet) {
      return this.find(t => t.tweetId === tweet._id);
    }, userTweets)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <ProfileTabPanel value={value} index={index}>
      {filtered.map(filteredTweet => (
        <Tweet key={filteredTweet._id} tweet={filteredTweet} />
      ))}
    </ProfileTabPanel>
  );
}
