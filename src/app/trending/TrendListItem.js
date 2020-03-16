import React from 'react';
import { Link } from '@reach/router';
// Mui Components
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  trendNumber: {
    color: '#000'
  },
  hashTag: {
    color: '#000',
    fontWeight: 600
  },
  tweetCount: {
    color: theme.palette.primary.dark
  },
  listItem: {
    '&:hover': {
      '& .MuiBox-root': {
        opacity: '0.04'
      }
    }
  },
  focusHighlight: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: 'inherit',
    pointerEvents: 'none',
    backgroundColor: 'currentcolor'
  },
  listItemSecondaryAction: {
    top: '30%',
    right: '9px'
  }
}));
export default function TrendListItem({ trend, divider, handleNavigate }) {
  const classes = useStyles();

  const onNavigate = event => {
    event.stopPropagation();
    handleNavigate(trend.trend_title);
  };

  const handleMore = event => {
    event.stopPropagation();
  };

  return (
    <ButtonBase
      divider={divider}
      className={classes.listItem}
      component={ListItem}
      onClick={onNavigate}
      dense
      focusRipple
      disableRipple
    >
      <ListItemText
        primary={
          <>
            <Typography
              variant="caption"
              className={classes.trendNumber}
            >{`${trend.number}. Trend`}</Typography>
            <Typography variant="body1" className={classes.hashTag}>
              {trend.trend_title}
            </Typography>
          </>
        }
        secondary={
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            className={classes.tweetCount}
          >
            {trend.tweet_count} Tweets
          </Typography>
        }
      />
      <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
        <IconButton aria-label="more" size="small" onClick={handleMore}>
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <Box component="span" className={classes.focusHighlight}></Box>
    </ButtonBase>
  );
}
