import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Mui Components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
// Components
import PageTitle from '../../common/ui/PageTitle';
import RightBar from '../../common/ui/RightBar';
import SkeletonTweet from '../../common/ui/skeletons/SkeletonTweet';
import SuggestedFollowListContainer from '../discover/SuggestedFollowListContainer';
import TrendsList from '../discover/TrendsList';
import Tweet from '../home/Tweet';

export default function Bookmarks() {
  const tweets = useSelector(state => state.tweets);
  const { loading } = useSelector(state => state.ui);

  return (
    <>
      <Grid item xs={12} md={8}>
        <PageTitle renderTitle="Bookmarks" />
        <Paper variant="outlined">
          {loading
            ? [1, 2, 3].map(key => <SkeletonTweet key={key} />)
            : tweets
                .filter(tweet => tweet.isBookmark)
                .map(tweet => <Tweet tweet={tweet} key={tweet._id} />)}
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
