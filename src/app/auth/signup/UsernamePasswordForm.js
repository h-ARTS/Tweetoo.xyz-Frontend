import React, { useState } from 'react';
// Mui Components
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOff from '@material-ui/icons/VisibilityOffTwoTone';
// import { makeStyles } from '@material-ui/core/styles';

const UsernamePasswordForm = React.forwardRef(
  ({ password, handle, onDataChange }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
      event.preventDefault();
    };

    const handleDataChange = event => {
      onDataChange({
        [event.target.id]: event.target.value
      });
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
              autoComplete="current-password"
              color="secondary"
              id="password"
              label="Password"
              value={password}
              onChange={handleDataChange}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    ref={ref}
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="username"
            color="secondary"
            variant="filled"
            id="userHandle"
            label="User name"
            type="text"
            value={handle}
            onChange={handleDataChange}
            fullWidth
          />
        </Grid>
      </Grid>
    );
  }
);

export default UsernamePasswordForm;
