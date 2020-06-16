import React from 'react';
// Mui Components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Components
import PageTitle from '../../common/ui/PageTitle';
import RightBar from '../../common/ui/RightBar';
import SkeletonTweet from '../../common/ui/skeletons/SkeletonTweet';
import SuggestedFollowListContainer from '../discover/SuggestedFollowListContainer';
import TrendsList from '../discover/TrendsList';
import TweetContainer from '../home/TweetContainer';
import useFetchBookmarks from '../../common/hooks/react-query/useFetchBookmarks';

export default function Bookmarks() {
  const [status, tweets] = useFetchBookmarks();

  return (
    <>
      <Grid item xs={12} md={8}>
        <PageTitle renderTitle="Bookmarks" />
        <Paper variant="outlined">
          {status === 'loading' ? (
            [1, 2, 3].map(key => <SkeletonTweet key={key} />)
          ) : status === 'error' || !tweets.length ? (
            <Box p={1}>
              <Typography>
                You have no bookmarks at the moment. Discover Tweetoo.xyz now!
              </Typography>
            </Box>
          ) : (
            tweets.map(tweet => (
              <TweetContainer tweet={tweet} key={tweet._id} />
            ))
          )}
        </Paper>
      </Grid>
      <Hidden smDown>
        <RightBar>
          <Box my={1}>
            <TrendsList />
          </Box>
          <SuggestedFollowListContainer />
        </RightBar>
      </Hidden>
    </>
  );
}
