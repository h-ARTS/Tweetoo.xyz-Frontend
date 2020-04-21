import React from 'react';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';
import { red, green, lightBlue } from '@material-ui/core/colors';
// Mui Icons
import LikeIcon from '@material-ui/icons/FavoriteTwoTone';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
import ReplyIcon from '@material-ui/icons/ReplyTwoTone';

const useStyles = makeStyles(theme => ({
  like: {
    color: theme.palette.getContrastText(red['A400']),
    backgroundColor: red['A400']
  },
  reply: {
    color: theme.palette.getContrastText(green['A400']),
    backgroundColor: green['A400']
  },
  follow: {
    color: theme.palette.getContrastText(lightBlue['A400']),
    backgroundColor: lightBlue['A400']
  }
}));
export default function NotificationListItem({ notification, navigateToPage }) {
  const classes = useStyles();

  const generatePrimaryText = user => {
    const text = {
      follow: `${user.sender} is following you`,
      like: `${user.sender} liked your tweet.`,
      reply: `${user.sender} replied on your tweet.`
    };

    return text[user.type];
  };

  const generateIcon = user => {
    const icons = {
      follow: (
        <Avatar className={classes.follow}>
          <PersonAddIcon />
        </Avatar>
      ),
      like: (
        <Avatar className={classes.like}>
          <LikeIcon />
        </Avatar>
      ),
      reply: (
        <Avatar className={classes.reply}>
          <ReplyIcon />
        </Avatar>
      )
    };

    return icons[user.type];
  };

  const onListItemClick = e => {
    navigateToPage(e, notification);
  };

  return (
    <ListItem key={notification._id} button divider onClick={onListItemClick}>
      <ListItemAvatar>
        <Box>{generateIcon(notification)}</Box>
      </ListItemAvatar>
      <ListItemText primary={generatePrimaryText(notification)} />
    </ListItem>
  );
}
