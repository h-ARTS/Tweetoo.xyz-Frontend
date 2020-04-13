import React from 'react';
import { useSelector } from 'react-redux';
// Mui components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
import ProfileTabPanel from './ProfileTabPanel';
import Tweet from '../home/Tweet';

export const LikesPanel = React.memo(({ value, index, userTweets }) => {
  const tweets = useSelector(state => state.tweets);
  const filtered = tweets
    .filter(function(tweet) {
      return this.find(t => t.tweetId === tweet._id && tweet.isLiked === true);
    }, userTweets)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!userTweets) {
    return (
      <ProfileTabPanel value={value} index={index}>
        <Box p={1}>
          <Typography>
            So far you have no liked tweets. Start discovering Tweetoo!
          </Typography>
        </Box>
      </ProfileTabPanel>
    );
  } else {
    return (
      <ProfileTabPanel value={value} index={index}>
        {filtered
          .map(tweet => <Tweet key={tweet._id} tweet={tweet} />)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
      </ProfileTabPanel>
    );
  }
});

export default LikesPanel;
