import React from 'react';
import { useSelector } from 'react-redux';
// Mui Components
import Paper from '@material-ui/core/Paper';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';
// Components
import NewTweetForm from './NewTweetForm';

const useStyles = makeStyles({
  root: {
    borderWidth: '0 0 6px 0'
  }
});
export default function NewTweetFormContainer() {
  const classes = useStyles();
  const { current } = useSelector(state => state.user);

  return (
    <Paper className={classes.root} variant="outlined" square>
      <NewTweetForm user={current} />
    </Paper>
  );
}
