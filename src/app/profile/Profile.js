import React from 'react';
import { Router } from '@reach/router';
// Redux
import { useStore } from 'react-redux';
import { logoutUser } from '../../redux/actions/user.actions';
// Pages
import FollowerPage from './followpage/FollowerPage';
import ProfileHomeContainer from './ProfileHomeContainer';
import TweetPage from './TweetPage';
// UI Components
import RightBar from '../../common/ui/RightBar';
import TrendsList from '../discover/TrendsList';
// MUI Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import NotFound from '../not-found/NotFound';

export default function Profile() {
  return (
    <>
      <Grid item xs={12} md={8}>
        <Router>
          <NotFound default disableSidebar />
          <ProfileHomeContainer path="/" />
          <TweetPage path="tweet/:tweetId" />
          <FollowerPage path="followers" />
          <FollowerPage path="following" />
        </Router>
      </Grid>
      <Hidden smDown>
        <RightBar>
          <TrendsList />
        </RightBar>
      </Hidden>
    </>
  );
}
