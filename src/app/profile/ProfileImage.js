import React from 'react';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  userImageContainer: {
    position: 'relative',
    height: '100%'
  },
  userImage: {
    position: 'absolute',
    bottom: -70,
    left: 0,
    right: 0,
    margin: '0 auto',
    width: theme.spacing(17),
    height: theme.spacing(17),
    border: `5px solid ${theme.palette.primary.main}`
  }
}));

export default function ProfileImage({ userImage }) {
  const classes = useStyles();
  return (
    <Box className={classes.userImageContainer}>
      <Avatar
        src={`http://localhost:6500/${userImage.url}`}
        className={classes.userImage}
      />
    </Box>
  );
}
