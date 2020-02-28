import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  ...theme.spreadThis,
  root: {
    display: 'inline-flex',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: '1.75rem',
    fontWeight: 'bold',
    width: '35px',
    height: '35px'
  }
}));
export const HashtagIcon = () => {
  const classes = useStyles();
  return <i className={classes.root}>#</i>;
};
