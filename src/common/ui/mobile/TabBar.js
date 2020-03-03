import React from 'react';
// Mui Components
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Fab from '@material-ui/core/Fab';
// Mui Icons
import CreateIcon from '@material-ui/icons/CreateTwoTone';
// Mui Theme
import { makeStyles } from '@material-ui/core/styles';
// Utils
import navlinks from '../../utils/navlinks';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    '& .Mui-selected': {
      color: theme.palette.secondary.main
    }
  },
  appBar: {
    top: 'auto',
    bottom: 0
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

export default function TabBar() {
  const classes = useStyles();
  const handleNavigation = (e, to) => {};

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classes.appBar}
      variant="outlined"
    >
      <BottomNavigation
        value="Home"
        onChnage={handleNavigation}
        className={classes.root}
      >
        {navlinks
          .filter(link => link.title !== 'Profile')
          .map(link => (
            <BottomNavigationAction
              value={link.title}
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
