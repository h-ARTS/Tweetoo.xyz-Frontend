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
// MUI Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReplyIcon from '@material-ui/icons/ChatBubbleTwoTone';
import RetweetIcon from '@material-ui/icons/CachedTwoTone';
import LikeIcon from '@material-ui/icons/FavoriteTwoTone';
import BookmarkIcon from '@material-ui/icons/BookmarkTwoTone';
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
import Tweet from '../../app/home/Tweet';

const useStyles = makeStyles(theme => ({
  ...theme.tweetooxyz,
  timeline: {}
}));

export default function Timeline() {
  const classes = useStyles();

  return (
    <div className={classes.timeline}>
      <Tweet />
    </div>
  );
}
