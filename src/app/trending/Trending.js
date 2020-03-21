import React from 'react';
// Mui Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
// Components
import RightBar from '../../common/ui/RightBar';
import TrendsList from './TrendsList';
import SearchInputContainer from '../../common/ui/SearchInputContainer';
import SuggestedFollowListContainer from './SuggestedFollowListContainer';

export default function Trending() {
  return (
    <>
      <Grid item xs={12} md={8}>
        <SearchInputContainer />
        <TrendsList />
      </Grid>
      <Hidden smDown>
        <RightBar>
          <SuggestedFollowListContainer />
        </RightBar>
      </Hidden>
    </>
  );
}
