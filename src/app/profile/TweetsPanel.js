import React, { memo } from 'react';
// Mui components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
import ProfileTabPanel from './ProfileTabPanel';
import TweetContainer from '../home/TweetContainer';
import SkeletonTweet from '../../common/ui/skeletons/SkeletonTweet';
import useFetchUserTweets from '../../common/hooks/react-query/useFetchUserTweets';

export const TweetsPanel = memo(function TweetsPanel({
  value,
  index,
  userTweets
}) {
  const { status, data } = useFetchUserTweets(userTweets);

  return (
    <ProfileTabPanel value={value} index={index}>
      {status === 'loading' ? (
        [1, 2, 3].map(key => <SkeletonTweet key={key} />)
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

export default TweetsPanel;
