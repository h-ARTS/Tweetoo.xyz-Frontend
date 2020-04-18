import React from 'react';
// MUI Theme
import { makeStyles, styled } from '@material-ui/core/styles';
import { compose, spacing } from '@material-ui/system';
// Components
import Tweet from '../../app/home/Tweet';
// Demo data
import NewTweetFormContainer from '../../app/home/NewTweetFormContainer';
import { useSelector } from 'react-redux';

const Box = styled('div')(compose(spacing));
const useStyles = makeStyles({
  timeline: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  }
});

export default function Timeline() {
  const classes = useStyles();
  const tweets = useSelector(state => state.tweets);
  return (
    <Box className={classes.timeline}>
      <NewTweetFormContainer />
      {tweets
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(tweet => (
          <Tweet tweet={tweet} key={tweet._id} />
        ))}
    </Box>
  );
}
