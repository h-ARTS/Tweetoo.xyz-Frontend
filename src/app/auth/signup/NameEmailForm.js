import React from 'react';
// Mui Components
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dialogText: {
    marginBottom: theme.spacing(3)
  }
}));

export default function NameEmailForm() {
  const classes = useStyles();

  return (
    <>
      <DialogContentText className={classes.dialogText}>
        Create new account and discover what's happening!
      </DialogContentText>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="fname"
            name="fullName"
            color="secondary"
            variant="filled"
            required
            fullWidth
            id="fullName"
            label="Name"
            dense
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            variant="filled"
            id="email"
            label="Email Address"
            type="email"
            dense
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
