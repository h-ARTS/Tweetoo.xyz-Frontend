import React from 'react';
import { Router } from '@reach/router';
// Redux
import { useStore } from 'react-redux';
import { logoutUser, imageUpload } from '../../redux/actions/user.actions';
// Pages
import ProfileHomeContainer from './ProfileHomeContainer';
import TweetPage from './TweetPage';
// UI Components
import RightBar from '../../common/ui/RightBar';
// MUI Components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import InputBase from '@material-ui/core/InputBase';
import TrendsList from '../trending/TrendsList';

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
