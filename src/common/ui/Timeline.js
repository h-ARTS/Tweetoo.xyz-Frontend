import React from 'react';
import { useSelector } from 'react-redux';
// MUI Theme
import { makeStyles, styled } from '@material-ui/core/styles';
import { compose, spacing } from '@material-ui/system';
// Components
import NewTweetFormContainer from '../../app/home/NewTweetFormContainer';
import SkeletonTweet from './skeletons/SkeletonTweet';
import Tweet from '../../app/home/Tweet';

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
  const { tweets, ui } = useSelector(state => state);
  return (
    <Box className={classes.timeline}>
      <NewTweetFormContainer />
      {ui.loading
        ? [1, 2, 3, 4, 5].map(key => <SkeletonTweet key={key} />)
        : tweets
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(tweet => <Tweet tweet={tweet} key={tweet._id} />)}
    </Box>
  );
}
