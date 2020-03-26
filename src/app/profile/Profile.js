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
import { Typography, Button } from '@material-ui/core';
import { useStore } from 'react-redux';
import { logoutUser } from '../../redux/actions/user.actions';

export default function Profile() {
  const store = useStore();

  const handleLogout = () => {
    store.dispatch(logoutUser());
  };

  return (
    <>
      <Grid item xs={12} md={8}>
        <Router>
          <ProfileHome path="/" />
          <TweetPage path="tweet/:tweetId" />
        </Router>
        <Typography variant="h1">My Profile</Typography>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          disableElevation
        >
          Logout
        </Button>
      </Grid>
      <Hidden smDown>
        <RightBar>
          <TrendsList />
        </RightBar>
      </Hidden>
    </>
  );
}
