import React from 'react';
import { useSelector } from 'react-redux';
import ProfileTabPanel from './ProfileTabPanel';
import Tweet from '../home/Tweet';
import SkeletonTweet from '../../common/ui/skeletons/SkeletonTweet';

export const TweetsPanel = React.memo(({ value, index, userTweets }) => {
  const { tweets, ui } = useSelector(state => state);

  const filtered = tweets
    .filter(function(tweet) {
      return this.find(t => t.tweetId === tweet._id);
    }, userTweets)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <ProfileTabPanel value={value} index={index}>
      {ui.loading
        ? [1, 2, 3].map(key => <SkeletonTweet key={key} />)
        : filtered.map(filteredTweet => (
            <Tweet key={filteredTweet._id} tweet={filteredTweet} />
          ))}
    </ProfileTabPanel>
  );
});

export default TweetsPanel;
