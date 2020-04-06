import React from 'react';
// MUI Theme
import { makeStyles, styled } from '@material-ui/core/styles';
import { compose, spacing } from '@material-ui/system';
// Components
import Tweet from '../../app/home/Tweet';
// Demo data
import demoData from '../utils/demoData';
import NewTweetFormContainer from '../../app/home/NewTweetFormContainer';

const Box = styled('div')(compose(spacing));
const useStyles = makeStyles(theme => ({
  timeline: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  }
}));

export default function Timeline() {
  const classes = useStyles();
  return (
    <Box className={classes.timeline}>
      <NewTweetFormContainer />
      {demoData.map(tweet => (
        <Tweet tweet={tweet} key={tweet.tweetId} />
      ))}
    </Box>
  );
}
