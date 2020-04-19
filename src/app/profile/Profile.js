import React from 'react';
import { Router } from '@reach/router';
// Redux
import { useStore } from 'react-redux';
import { logoutUser } from '../../redux/actions/user.actions';
// Pages
import FollowerPage from './FollowerPage';
import ProfileHomeContainer from './ProfileHomeContainer';
import TweetPage from './TweetPage';
// UI Components
import RightBar from '../../common/ui/RightBar';
import TrendsList from '../trending/TrendsList';
// MUI Components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

export default function Profile() {
  const store = useStore();

  const handleLogout = () => {
    store.dispatch(logoutUser());
  };

  return (
    <>
      <Grid item xs={12} md={8}>
        <Router>
          <ProfileHomeContainer path="/" />
          <TweetPage path="tweet/:tweetId" />
          <FollowerPage path="followers" />
          <FollowerPage path="following" />
        </Router>
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
