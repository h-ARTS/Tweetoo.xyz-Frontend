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
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  list: {
    display: 'flex',
    flexDirection: 'column'
  },
  listItem: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },
  listItemTitle: {
    fontSize: '1rem',
    fontWeight: 700
  },
  listItemIconRoot: {
    minWidth: 'auto'
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  const isXL = useMediaQuery('(max-width: 1280px)');

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
    <Grid
      container
      item
      sm={2}
      md={1}
      lg={2}
      justify={isXL ? 'center' : 'flex-start'}
    >
      <div className={classes.root}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={isXL && classes.list}
          subheader={
            !isXL && (
              <ListSubheader component="div" id="nested-list-subheader">
                Tweetoo.xyz
              </ListSubheader>
            )
          }
        >
          {links.map(link => (
            <ListItem
              button
              key={link.title}
              component={NavLink}
              to={link.to}
              className={classes.listItem}
              disableGutters={isXL}
            >
              <ListItemIcon className={isXL && classes.listItemIconRoot}>
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
              {!isXL && (
                <Typography
                  variant="button"
                  display="block"
                  className={classes.listItemTitle}
                >
                  {link.title}
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </Grid>
  );
}
