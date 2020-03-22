import React from 'react';
// Mui Components
import Paper from '@material-ui/core/Paper';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';
import NewTweetForm from './NewTweetForm';

const useStyles = makeStyles(theme => ({
  root: {
    borderWidth: '0 0 6px 0'
  }
}));
export default function NewTweetFormContainer() {
  const classes = useStyles();
  const user = { handle: 'mr_paki' };

  return (
    <Paper className={classes.root} variant="outlined" square>
      <NewTweetForm user={user} />
    </Paper>
  );
}
