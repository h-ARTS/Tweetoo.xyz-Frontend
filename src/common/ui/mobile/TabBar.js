import React from 'react';
// Mui Components
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Fab from '@material-ui/core/Fab';
// Mui Icons
import CreateIcon from '@material-ui/icons/CreateTwoTone';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    top: 'auto',
    bottom: 0
  },
  bottomNavigation: {
    borderRadius: 0,
    '& .Mui-selected': {
      color: theme.palette.secondary.main
    }
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
}));

export default function TabBar({ path, navlinks, handlePath }) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classes.root}
      variant="outlined"
    >
      <BottomNavigation
        className={classes.bottomNavigation}
        onChange={handlePath}
        value={path}
      >
        {navlinks
          .filter(link => link.title !== 'Profile')
          .map(link => (
            <BottomNavigationAction
              key={link.title}
              value={link.to}
              icon={<link.icon />}
              label={link.title}
            />
          ))}
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <CreateIcon />
        </Fab>
      </BottomNavigation>
    </AppBar>
  );
}
