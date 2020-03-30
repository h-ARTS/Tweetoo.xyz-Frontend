import React from 'react';
// Mui Components
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function NameEmailForm({ fullName, email, onDataChange }) {
  const handleDataChange = event => {
    onDataChange({
      [event.target.id]: event.target.value
    });
  };

  return (
    <>
      <DialogContentText>
        Create a new account and discover what's happening!
      </DialogContentText>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="fullname"
            name="fullName"
            color="secondary"
            variant="filled"
            required
            fullWidth
            id="fullName"
            label="Name"
            autoFocus
            value={fullName}
            onChange={handleDataChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            variant="filled"
            id="email"
            label="Email Address"
            required
            type="email"
            name="email"
            fullWidth
            value={email}
            onChange={handleDataChange}
          />
        </Grid>
      </Grid>
    </>
  );
}
