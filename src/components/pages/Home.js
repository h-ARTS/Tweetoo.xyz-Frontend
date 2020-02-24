import React from 'react';
import { Link } from '@reach/router';
// MUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Home Components
import Timeline from './home/Timeline';
import { HashtagIcon } from './home/HashtagIcon';
// MUI Icons
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import BellIcon from '@material-ui/icons/NotificationsTwoTone';
import BookmarksIcon from '@material-ui/icons/BookmarksTwoTone';
import ProfileIcon from '@material-ui/icons/AccountCircleTwoTone';
import { NavLink } from './home/NavLink';

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

export default function Home() {
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
    <Container>
      <Grid container>
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
              <ListItem
                button
                key={link.title}
                component={NavLink}
                to={link.to}
              >
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
        <Grid container item xs={12} sm={10} md={9}>
          <Grid item xs={12} sm={8}>
            <Paper variant="outlined" square>
              <Timeline />
            </Paper>
          </Grid>
          <Grid item xs={false} sm={4} />
        </Grid>
      </Grid>
    </Container>
  );
}
