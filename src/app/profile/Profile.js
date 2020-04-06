import React from 'react';
import { Router } from '@reach/router';
// Pages
import ProfileHomeContainer from './ProfileHomeContainer';
import TweetPage from './TweetPage';
// UI Components
import RightBar from '../../common/ui/RightBar';
// MUI Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TrendsList from '../trending/TrendsList';
import { Typography, Button, InputBase } from '@material-ui/core';
import { useStore } from 'react-redux';
import { logoutUser, imageUpload } from '../../redux/actions/user.actions';

export default function Profile() {
  const store = useStore();

  const handleLogout = () => {
    store.dispatch(logoutUser());
  };

  const handleUpload = event => {
    const file = event.target.files[0];
    store.dispatch(
      imageUpload({ file, handle: 'paki', dimension: 'userImage' })
    );
  };

  return (
    <>
      <Grid item xs={12} md={8}>
        <Router>
          <ProfileHomeContainer path="/" />
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
        <InputBase type="file" onChange={handleUpload} />
      </Grid>
      <Hidden smDown>
        <RightBar>
          <TrendsList />
        </RightBar>
      </Hidden>
    </>
  );
}
