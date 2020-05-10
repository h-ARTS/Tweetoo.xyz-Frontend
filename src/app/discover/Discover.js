import React from 'react';
import { Router } from '@reach/router';
// Mui Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
// Components
import RightBar from '../../common/ui/RightBar';
import TrendsList from './TrendsList';
import SearchInputContainer from '../../common/ui/SearchInputContainer';
import SearchResults from './SearchResults';
import SuggestedFollowListContainer from './SuggestedFollowListContainer';

export default function Discover() {
  return (
    <>
      <Grid item xs={12} md={8}>
        <SearchInputContainer />
        <Router>
          <TrendsList path="/" />
          <SearchResults path="search" />
        </Router>
      </Grid>
      <Hidden smDown>
        <RightBar>
          <SuggestedFollowListContainer />
        </RightBar>
      </Hidden>
    </>
  );
}
