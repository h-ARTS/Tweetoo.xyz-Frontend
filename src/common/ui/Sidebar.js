import React from 'react';
// MUI
import {
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  Badge,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// UI Components
import { NavLink } from './NavLink';
import { HashtagIcon } from '../../common/ui/HashtagIcon';
// MUI Icons
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import BellIcon from '@material-ui/icons/NotificationsTwoTone';
import BookmarksIcon from '@material-ui/icons/BookmarksTwoTone';
import ProfileIcon from '@material-ui/icons/AccountCircleTwoTone';

const useStyles = makeStyles(theme => ({
  ...theme.spreadThis,
  root: {
    position: 'fixed'
  },
  listItemTitle: {
    fontSize: '1rem',
    fontWeight: 700
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  const links = [
    {
      to: '/home',
      title: 'Home',
      icon: HomeIcon
    },
    {
      to: '/trending',
      title: 'Trending',
      icon: HashtagIcon
    },
    {
      to: '/notifications',
      title: 'Notifications',
      icon: BellIcon
    },
    {
      to: '/bookmarks',
      title: 'Bookmarks',
      icon: BookmarksIcon
    },
    {
      to: '/profile',
      title: 'Profile',
      icon: ProfileIcon
    }
  ];

  return (
    <Grid item xs={false} sm={2} md={3}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Tweetoo.xyz
          </ListSubheader>
        }
      >
        {links.map(link => (
          <ListItem button key={link.title} component={NavLink} to={link.to}>
            <ListItemIcon>
              {link.title === 'Notifications' ? (
                <Badge
                  variant="dot"
                  overlap="circle"
                  badgeContent=" "
                  color="secondary"
                >
                  <link.icon fontSize="large" />
                </Badge>
              ) : (
                <link.icon fontSize="large" />
              )}
            </ListItemIcon>
            <Typography
              variant="button"
              display="block"
              className={classes.listItemTitle}
            >
              {link.title}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
