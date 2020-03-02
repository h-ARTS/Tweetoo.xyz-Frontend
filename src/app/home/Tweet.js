import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardActions,
  Badge,
  CardActionArea
} from '@material-ui/core';

// MUI Theme
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import { red, green, blue, grey } from '@material-ui/core/colors';

import { Link } from '@reach/router';
import ToggleButton from '../../common/ui/ToggleButton';
import TweetTitle from './TweetTitle';
import MoreButton from './MoreButton';
import BookmarkIcon from '@material-ui/icons/BookmarkTwoTone';
import TweetAction from './TweetAction';

const useStyles = makeStyles(theme => ({
  ...theme.tweetooxyz,
  timeline: {},
  root: {
    boxShadow: 'none',
    borderRadius: 0,
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
  },
  cardContent: {
    paddingTop: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: '0 16px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 10
  },
  avatar: {
    backgroundColor: red[500]
  },
  actions: {
    justifyContent: 'space-around'
  }
}));

const BookmarkButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
    '&:hover': {
      color: blue[700]
    }
  }
}))(IconButton);

export default function Tweet() {
  const classes = useStyles();
  // Demo data
  const tweetObj = {
    tweetId: '48598342568723',
    fullText:
      'This impressive paella is a perfect party dish and a fun meal #partydish',
    fullName: 'Mr Paki',
    handle: 'mr_paki',
    retweetCount: 0,
    likeCount: 0,
    replies: [],
    timestamp: '2020-02-24T20:18:29.000Z'
  };

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/${tweetObj.handle}`}>
        <CardHeader
          avatar={
            <Avatar aria-label="profile" className={classes.avatar}>
              P
            </Avatar>
          }
          title={
            <TweetTitle
              handle={tweetObj.handle}
              fullName={tweetObj.fullName}
              time={tweetObj.timestamp}
            />
          }
          action={<MoreButton />}
        />
        <CardContent className={classes.cardContent}>
          <Typography type="body2">{tweetObj.fullText}</Typography>
        </CardContent>
        <CardMedia
          title="Random"
          image="https://source.unsplash.com/random/470x240"
          className={classes.media}
        />
      </CardActionArea>
      <CardActions className={classes.actions}>
        <TweetAction actionType="reply" />
        <TweetAction actionType="retweet" />
        <TweetAction actionType="like" />
        <BookmarkButton color="primary" aria-label="bookmark">
          <BookmarkIcon />
        </BookmarkButton>
      </CardActions>
    </Card>
  );
}
