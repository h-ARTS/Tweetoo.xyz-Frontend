import React from 'react';
import { Grid } from '@material-ui/core';
import Timeline from '../../common/ui/Timeline';
import Layout from '../../common/ui/Layout';

export default function Home() {
  return (
    <Layout>
      <Grid item xs={12} sm={9}>
        <Timeline />
      </Grid>
      <Grid item xs={false} sm={3}>
        <aside>
          <div className="searchField"></div>
          <div className="trendsList"></div>
        </aside>
      </Grid>
    </Layout>
  );
}
