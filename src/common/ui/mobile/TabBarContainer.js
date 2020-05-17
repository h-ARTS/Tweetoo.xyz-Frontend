import React, { useState, useCallback } from 'react';
import { navigate, useLocation } from '@reach/router';
// Utils
import navlinks from '../../utils/navlinks';
import TabBar from './TabBar';

export default function TabBarContainer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const handlePath = useCallback((e, toPath) => {
    setPath(toPath);
    navigate(toPath);
  }, []);

  return <TabBar path={path} navlinks={navlinks} handlePath={handlePath} />;
}
