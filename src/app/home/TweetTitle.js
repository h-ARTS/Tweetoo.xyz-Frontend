import React from 'react';
// MUI Components
import { Typography } from '@material-ui/core';
// MUI Theme
import { makeStyles } from '@material-ui/core/styles';
// Router
import { Link } from '@reach/router';

const useStyles = makeStyles(theme => ({
  ...theme.tweetooxyz,
  user: {
    display: 'flex',
    alignItems: 'baseline',
    flexShrink: 1,
    fontSize: '1rem',
    textDecoration: 'none',
    '& .MuiTypography-body1': {
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  handle: {
    color: theme.palette.primary.dark,
    marginLeft: '5px'
  },
  dotDivider: {
    color: theme.palette.primary.dark,
    padding: '0 5px'
  },
  tweetTime: {
    color: theme.palette.primary.dark
  }
}));

export default function TweetTitle(props) {
  const classes = useStyles();

  const { handle, fullName, time } = props;
  return (
    <div className={classes.titleContainer}>
      <Link to={`/${handle}`} className={classes.user}>
        <Typography variant="body1">{fullName}</Typography>
        <Typography variant="body2" className={classes.handle}>
          @{handle}
        </Typography>
        <div className={classes.dotDivider}>
          <span>·</span>
        </div>
        <div className={classes.tweetTime}>
          <time dateTime={time}>12 Min.</time>
        </div>
      </Link>
    </div>
  );
}
