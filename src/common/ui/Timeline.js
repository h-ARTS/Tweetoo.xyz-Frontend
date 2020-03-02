import React from 'react';
// MUI
import { Paper } from '@material-ui/core';
// MUI Theme
import { makeStyles } from '@material-ui/core/styles';
// Components
import Tweet from '../../app/home/Tweet';

const useStyles = makeStyles(theme => ({
  ...theme.tweetooxyz,
  timeline: {}
}));

export default function Timeline() {
  const classes = useStyles();

  return (
    <Paper className={classes.timeline} variant="outlined" square>
      <Tweet />
    </Paper>
  );
}
