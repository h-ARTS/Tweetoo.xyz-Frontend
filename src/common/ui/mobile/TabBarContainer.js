import React, { useState, useCallback } from 'react';
import { navigate, useLocation } from '@reach/router';
import useFunctionCalls from '../../hooks/useFunctionCalls';
// Mui Components
import AppBar from '@material-ui/core/AppBar';
// Mui Theme
import { makeStyles } from '@material-ui/core/styles';
// Utils
import navlinks from '../../utils/navlinks';
import TabBar from './TabBar';

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 0
  }
});
export default function TabBarContainer() {
  const classes = useStyles();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const handlePath = useCallback((e, toPath) => {
    setPath(toPath);
    navigate(toPath);
  }, []);

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classes.appBar}
      variant="outlined"
    >
      <TabBar path={path} navlinks={navlinks} handlePath={handlePath} />
    </AppBar>
  );
}
