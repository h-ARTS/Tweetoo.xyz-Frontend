import React, { memo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import isLikedPipe from '../../common/utils/isLikedPipe';
import isRetweetPipe from '../../common/utils/isRetweetPipe';
// Mui components
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
// Components
import ProfileTabPanel from './ProfileTabPanel';
import TweetContainer from '../home/TweetContainer';

export const MediaPanel = memo(function LikePanel({
  value,
  index,
  userTweets,
  handle
}) {
  const { status, data } = useQuery('tweetsMedia', async () => {
    const response = await axios.get('/api/tweets');
    let filteredTweets = await isLikedPipe(response.data);
    filteredTweets = isRetweetPipe(filteredTweets, userTweets);
    return filteredTweets
      .filter(tweet => tweet.tweetImages.length > 0 && tweet.handle === handle)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  return (
    <ProfileTabPanel value={value} index={index}>
      {status === 'loading' ? (
        <CircularProgress color="secondary" size={2} />
      ) : status === 'error' || !data.length ? (
        <Box p={1}>
          <Typography>
            So far you have no tweets with images. Start tweeting your journey!
          </Typography>
        </Box>
      ) : (
        data.map(tweet => <TweetContainer key={tweet._id} tweet={tweet} />)
      )}
    </ProfileTabPanel>
  );
});

export default MediaPanel;
