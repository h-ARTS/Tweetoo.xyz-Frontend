import React from 'react';
import { Router } from '@reach/router';
// Pages
import ProfileHome from './ProfileHome';
import TweetPage from './TweetPage';
// UI Components
import RightBar from '../../common/ui/RightBar';
// MUI Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TrendsList from '../trending/TrendsList';
import { Typography } from '@material-ui/core';

export default function Profile() {
  return (
    <>
      <Grid item xs={12} md={8}>
        <Router>
          <ProfileHome path="/" />
          <Typography variant="h1">My Profile</Typography>
          <TweetPage path="tweet/:tweetId" />
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
