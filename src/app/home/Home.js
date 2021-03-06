import React from 'react';
// Mui Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
// Components
import RightBar from '../../common/ui/RightBar';
import Timeline from '../../common/ui/Timeline';
import TrendsList from '../discover/TrendsList';
import SearchInputContainer from '../../common/ui/SearchInputContainer';
import PageTitle from '../../common/ui/PageTitle';

export default function Home() {
  return (
    <>
      <Grid item xs={12} md={8}>
        <PageTitle renderTitle="Home" />
        <Timeline />
      </Grid>
      <Hidden smDown>
        <RightBar>
          <SearchInputContainer variant={2} />
          <TrendsList />
        </RightBar>
      </Hidden>
    </>
  );
}
