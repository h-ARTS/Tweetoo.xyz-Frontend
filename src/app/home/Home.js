import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Home Components
import Sidebar from '../../common/ui/Sidebar';
import Timeline from '../../common/ui/Timeline';

export default function Home() {
  return (
    <Container disableGutters>
      <Grid container justify="space-between">
        <Sidebar />
        <Grid container item xs={12} sm={11} lg={10}>
          <Grid item xs={12} sm={9}>
            <Timeline />
          </Grid>
          <Grid item xs={false} sm={3} />
        </Grid>
      </Grid>
    </Container>
  );
}
