import React from 'react';
// Mui Components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';

export default function UsernamePasswordForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          color="secondary"
          variant="filled"
          id="password"
          label="Password"
          type="password"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="secondary"
          variant="filled"
          id="username"
          label="User name"
          type="text"
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
