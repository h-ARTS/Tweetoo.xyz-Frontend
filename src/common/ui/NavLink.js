import React, { useState } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  active: {
    color: theme.palette.secondary.main,
    '& .MuiSvgIcon-root': {
      color: theme.palette.secondary.main
    }
  }
}));

export const NavLink = React.forwardRef((props, ref) => {
  const classes = useStyles(props);
  const [active, setActive] = useState(false);
  const isActive = ({ isCurrent }) => {
    return isCurrent ? setActive(true) : setActive(false);
  };

  return (
    <Link
      {...props}
      getProps={isActive}
      className={
        active ? `${props.className} ${classes.active}` : props.className
      }
      ref={ref}
    />
  );
});
