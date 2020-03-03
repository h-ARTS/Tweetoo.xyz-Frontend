import React from 'react';
// MUI
import { Paper } from '@material-ui/core';
// MUI Theme
import { makeStyles, styled } from '@material-ui/core/styles';
import { compose, spacing } from '@material-ui/system';
// Components
import Tweet from '../../app/home/Tweet';

const Box = styled('div')(compose(spacing));

const useStyles = makeStyles(theme => ({
  ...theme.tweetooxyz,
  timeline: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  }
}));

// Demo data
const tweets = [
  {
    tweetId: '48598342568723',
    fullText:
      'This impressive paella is a perfect party dish and a fun meal #partydish',
    fullName: 'Mr Paki',
    handle: 'mr_paki',
    retweetCount: 0,
    likeCount: 0,
    replies: [],
    timestamp: '2020-02-24T20:18:29.000Z'
  },
  {
    tweetId: '5463546456453',
    fullText:
      'Sunt ad proident esse consequat consectetur excepteur esse ut est esse ullamco sunt Lorem culpa. #TuesdayThoughts',
    fullName: 'Henry Douglas',
    handle: 'realHenreyDouglas',
    retweetCount: 67,
    likeCount: 89,
    replies: [],
    timestamp: '2020-02-24T20:18:29.000Z'
  },
  {
    tweetId: '32454754654654',
    fullText:
      'Irure est voluptate dolor quis nostrud culpa consectetur quis in consectetur est sunt. Anim velit consequat non dolore quis pariatur magna non dolore sunt sint Lorem sunt. #TuesdayThoughts',
    fullName: 'Super Nova',
    handle: 'supernova1',
    retweetCount: 12,
    likeCount: 33,
    replies: [],
    timestamp: '2020-02-24T20:18:29.000Z'
  }
];

export default function Timeline() {
  const classes = useStyles();

  return (
    <Box className={classes.timeline}>
      <Paper square>
        {tweets.map(tweet => (
          <Tweet tweet={tweet} key={tweet.tweetId} />
        ))}
      </Paper>
    </Box>
  );
}
