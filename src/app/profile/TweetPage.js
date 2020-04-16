import React, { useState, useEffect } from 'react';
import { useParams } from '@reach/router';
import { useSelector } from 'react-redux';
// Mui components
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
// Components
import Tweet from '../home/Tweet';

export default function TweetPage() {
  const params = useParams();
  const tweets = useSelector(state => state.tweets);
  const [currentTweet, setCurrentTweet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tweets.length > 0) {
      tweets.forEach(tweet => {
        if (tweet._id === params.tweetId) {
          setCurrentTweet(tweet);
          setLoading(false);
          return;
        }
      });
    }
  }, [params.tweetId, tweets]);

  return (
    <Paper elevation={0} variant="outlined" square>
      {loading ? (
        <Box p={3}>
          <CircularProgress size="small" color="secondary" />
        </Box>
      ) : (
        <Tweet tweet={currentTweet} largeText />
      )}
    </Paper>
  );
}
