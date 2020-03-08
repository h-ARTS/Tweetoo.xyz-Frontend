import React from 'react';
import { Router } from '@reach/router';
// Pages
import ProfileHome from './ProfileHome';
import TweetPage from './TweetPage';
// UI Components
import Layout from '../../common/ui/Layout';
import RightBar from '../../common/ui/RightBar';
// MUI Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

export default function Profile() {
  return (
    <Layout>
      <Grid item xs={12} md={8}>
        <Router>
          <ProfileHome path="/" />
          <TweetPage path="tweet/:tweetId" />
        </Router>
      </Grid>
      <Hidden smDown>
        <RightBar />
      </Hidden>
    </Layout>
  );
}
