import React from 'react';
// Mui Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
// Components
import Layout from '../../common/ui/Layout';
import RightBar from '../../common/ui/RightBar';
import TrendsList from './TrendsList';

export default function Trending() {
  return (
    <Layout>
      <Grid item xs={12} md={8}>
        <TrendsList />
      </Grid>
      <Hidden smDown>
        <RightBar>
          <p>You might follow them..</p>
        </RightBar>
      </Hidden>
    </Layout>
  );
}
