import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// MUI
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// UI Components
import { NavLink } from './NavLink';
import navlinks from '../utils/navlinks';

const useStyles = makeStyles(theme => ({
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
  },
  avatarContainer: {
    display: 'inline-flex',
    minWidth: 56,
    flexShrink: 0
  },
  avatar: {
    border: `1px solid ${theme.palette.secondary.main}`,
    width: theme.spacing(4.35),
    height: theme.spacing(4.35)
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  const isXL = useMediaQuery('(max-width: 1280px)');
  const { userImage } = useSelector(state => state.user.current);

  return (
    <Grid
      container
      item
      sm={2}
      md={1}
      lg={2}
      justify={isXL ? 'center' : 'flex-start'}
      component="aside"
    >
      <div className={classes.root}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={isXL ? classes.list : ''}
          subheader={
            !isXL && (
              <ListSubheader component="div" id="nested-list-subheader">
                Tweetoo.xyz
              </ListSubheader>
            )
          }
        >
          {navlinks.map(link => (
            <ListItem
              button
              key={link.title}
              component={NavLink}
              to={link.to}
              className={classes.listItem}
              disableGutters={isXL}
            >
              {userImage.url && link.title === 'Profile' ? (
                <Box className={classes.avatarContainer}>
                  <Avatar
                    src={`http://localhost:6500/${userImage.url}`}
                    className={classes.avatar}
                  />
                </Box>
              ) : (
                <ListItemIcon className={isXL ? classes.listItemIconRoot : ''}>
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
              )}
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
