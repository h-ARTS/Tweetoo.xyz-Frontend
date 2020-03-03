import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// Home Components
import Sidebar from './Sidebar';
import TabBar from './mobile/TabBar';

export default function Layout(props) {
  const isLg = useMediaQuery('(max-width: 1024px)');
  const isMd = useMediaQuery('(max-width: 960px)');

  return (
    <Container disableGutters={isLg}>
      <Grid container justify={!isLg ? 'space-between' : 'flex-start'}>
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
          spacing={!isMd ? 2 : 0}
        >
          {props.children}
        </Grid>
        <Hidden smUp>
          <Grid item xs>
            <TabBar />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}
