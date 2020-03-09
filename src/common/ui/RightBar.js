import React from 'react';
// Mui Components
import Grid from '@material-ui/core/Grid';
// Mui styles
import { makeStyles } from '@material-ui/core/styles';
import TrendsList from '../../app/trending/TrendsList';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  rightAside: {
    position: 'sticky',
    top: 0,
    right: 0
  }
});

export default function RightBar(props) {
  const classes = useStyles();

  return (
    <Grid item md={4}>
      <Box component="aside" className={classes.rightAside}>
        {props.children}
      </Box>
    </Grid>
  );
}
