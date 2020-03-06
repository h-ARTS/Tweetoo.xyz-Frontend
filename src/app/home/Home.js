import React from 'react';
// Mui Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
// Components
import Layout from '../../common/ui/Layout';
import RightBar from '../../common/ui/RightBar';
import Timeline from '../../common/ui/Timeline';

export default function Home() {
  return (
    <Layout>
      <Grid item xs={12} md={8}>
        <Timeline />
      </Grid>
      <Hidden smDown>
        <RightBar />
      </Hidden>
    </Layout>
  );
}
