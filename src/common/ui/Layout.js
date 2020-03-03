import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Home Components
import Sidebar from './Sidebar';

export default function Layout(props) {
  return (
    <Container disableGutters>
      <Grid container justify="space-between">
        <Sidebar />
        <Grid container item xs={12} sm={11} lg={10}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
}
