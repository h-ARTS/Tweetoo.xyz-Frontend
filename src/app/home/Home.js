import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Home Components
import Sidebar from '../../common/ui/Sidebar';
import Timeline from '../../common/ui/Timeline';

export default function Home() {
  return (
    <Container>
      <Grid container>
        <Sidebar />
        <Grid container item xs={12} sm={10} md={9}>
          <Grid item xs={12} sm={8}>
            <Timeline />
          </Grid>
          <Grid item xs={false} sm={4} />
        </Grid>
      </Grid>
    </Container>
  );
}
