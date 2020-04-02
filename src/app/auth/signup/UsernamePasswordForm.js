import React, { useState } from 'react';
// Mui Components
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOff from '@material-ui/icons/VisibilityOffTwoTone';
// Components
import PasswordStrengthBar from './PasswordStrengthBar';

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
      <>
        <DialogContentText>Choose a strong password!</DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel htmlFor="password" color="secondary">
                Password
              </InputLabel>
              <FilledInput
                autoFocus
                autoComplete="current-password"
                color="secondary"
                id="password"
                label="Password"
                required
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
            <PasswordStrengthBar password={password} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="username"
              color="secondary"
              variant="filled"
              id="userHandle"
              label="User name"
              required
              type="text"
              value={handle}
              onChange={handleDataChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </>
    );
  }
);

export default UsernamePasswordForm;
