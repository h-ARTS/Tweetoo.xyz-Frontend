import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import ProfileTabPanel from './ProfileTabPanel';
import TweetContainer from '../home/TweetContainer';
import SkeletonTweet from '../../common/ui/skeletons/SkeletonTweet';

export const TweetsPanel = memo(function TweetsPanel({
  value,
  index,
  userTweets
}) {
  const loading = useSelector(state => state.ui.loading);
  const tweets = useSelector(state => state.tweets);

  const filtered = tweets
    .filter(function(tweet) {
      return this.find(t => t.tweetId === tweet._id);
    }, userTweets)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <ProfileTabPanel value={value} index={index}>
      {loading
        ? [1, 2, 3].map(key => <SkeletonTweet key={key} />)
        : filtered.map(filteredTweet => (
            <TweetContainer key={filteredTweet._id} tweet={filteredTweet} />
          ))}
    </ProfileTabPanel>
  );
});

export default TweetsPanel;
