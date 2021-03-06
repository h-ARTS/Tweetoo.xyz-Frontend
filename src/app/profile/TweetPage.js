import React, { useState, useEffect } from 'react';
import { useParams } from '@reach/router';
import { useSelector } from 'react-redux';
// Mui components
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
// Components
import TweetContainer from '../home/TweetContainer';
import Replies from './Replies';
import PageTitle from '../../common/ui/PageTitle';

export default function TweetPage() {
  const params = useParams();
  const tweets = useSelector(state => state.tweets);
  const [currentTweet, setCurrentTweet] = useState({});
  const [loadingTweet, setLoadingTweet] = useState(true);

  useEffect(() => {
    if (tweets.length > 0) {
      const found = tweets.find(tweet => {
        return tweet._id === params.tweetId;
      });
      setCurrentTweet(found);
      setLoadingTweet(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweets]);

  return (
    <>
      <PageTitle renderTitle="Tweetoo.xyz" backButton />
      <Paper elevation={0} variant="outlined" square>
        {loadingTweet ? (
          <Box p={3}>
            <CircularProgress size="small" color="secondary" />
          </Box>
        ) : (
          <TweetContainer tweet={currentTweet} largeText />
        )}
        <Replies />
      </Paper>
    </>
  );
}
