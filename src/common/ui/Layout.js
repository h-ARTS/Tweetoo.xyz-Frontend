import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Home Components
import Sidebar from './Sidebar';
import { useMediaQuery, Hidden } from '@material-ui/core';

export default function Layout(props) {
  const isLg = useMediaQuery('(max-width: 1024px)');
  const isMd = useMediaQuery('(max-width: 960px)');

  return (
    <Container disableGutters={isLg}>
      <Grid container justify={!isLg && 'space-between'}>
        <Hidden xsDown>
          <Sidebar />
        </Hidden>
        <Grid
          container
          item
          xs={12}
          sm={10}
          md={11}
          lg={10}
          spacing={!isMd && 1}
        >
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
}
