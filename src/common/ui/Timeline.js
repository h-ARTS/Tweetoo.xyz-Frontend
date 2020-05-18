import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
// MUI
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
// Components
import NewTweetFormContainer from '../../app/home/NewTweetFormContainer';
import SkeletonTweet from './skeletons/SkeletonTweet';
import TweetContainer from '../../app/home/TweetContainer';
import isLikedPipe from '../utils/isLikedPipe';
import isRetweetPipe from '../utils/isRetweetPipe';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const useStyles = makeStyles({
  timeline: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  }
});
export default function Timeline() {
  const classes = useStyles();
  const lastElem = useRef();
  const fetchTweets = async (key, lastId = '') => {
    const { data } = await axios.get(`/api/tweet/next?tweetId=${lastId}`);

    let results = await isLikedPipe(data.docs);
    results = isRetweetPipe(results);

    return { docs: results, lastId: data.lastId };
  };
  const {
    status,
    data,
    error,
    fetchMore,
    isFetchingMore,
    refetch
  } = useInfiniteQuery('tweets', fetchTweets, {
    getFetchMore: lastGroup => lastGroup.lastId,
    refetchInterval: 3000,
    retry: 4
  });

  const refetchNewData = useCallback(() => {
    refetch();
  }, [refetch]);

  useIntersectionObserver({ target: lastElem, onIntersect: fetchMore });

  return (
    <Box className={classes.timeline}>
      <NewTweetFormContainer onFormSubmit={refetchNewData} />
      {status === 'loading'
        ? [1, 2, 3, 4, 5].map(key => <SkeletonTweet key={key} />)
        : data.map((tweetDocs, idx) => (
            <React.Fragment key={idx}>
              {tweetDocs.docs
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(tweet => (
                  <TweetContainer
                    tweet={tweet}
                    key={tweet._id}
                    onRefresh={refetchNewData}
                  />
                ))}
            </React.Fragment>
          ))}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={90}
        ref={lastElem}
      >
        {isFetchingMore && <CircularProgress color="secondary" disableShrink />}
        {status === 'error' && <p>{error.message}</p>}
      </Box>
    </Box>
  );
}
