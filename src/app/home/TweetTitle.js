import React from 'react';
// MUI Components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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
    '& .MuiTypography-body1 > a': {
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      textDecoration: 'none',
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
  const { handle, fullName, time, handleStopPropagation } = props;

  return (
    <Box className={classes.user} onClick={handleStopPropagation}>
      <Typography variant="body1">
        <Link to={`/${handle}`} alt={handle} onClick={handleStopPropagation}>
          {fullName}
        </Link>
      </Typography>
      <Typography variant="body2" className={classes.handle}>
        @{handle}
      </Typography>
      <div className={classes.dotDivider}>
        <span>·</span>
      </div>
      <div className={classes.tweetTime}>
        <time dateTime={time}>12 Min.</time>
      </div>
    </Box>
  );
}
