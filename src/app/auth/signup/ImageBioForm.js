import React from 'react';
// Mui Components
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';

// bio: String,
// birthday: Date,
const useStyles = makeStyles(theme => ({
  dialogText: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
}));
export default function ImageBioForm() {
  const classes = useStyles();
  return (
    <>
      <DialogContentText className={classes.dialogText}>
        Tell us more about yourself.
      </DialogContentText>
    </>
  );
}
