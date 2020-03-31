import React, { useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { signinUser } from '../../redux/actions/user.actions';
// MUI Components
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import SignupForm from './SignupForm';
import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  logo: {
    fontWeight: 800,
    marginBottom: theme.spacing(2)
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.secondary.light
  }
}));
export default function AuthPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openLoadingSpinner, setOpenLoadingSpinner] = useState(false);
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    persist: false
  });
  // const [error, setError] = useState('');

  const handleSignin = event => {
    event.preventDefault();
    setOpenLoadingSpinner(true);
    dispatch(signinUser(userData));
  };

  const handleCloseDialog = () => {
    setOpenSignUpDialog(false);
  };

  return (
    <>
      <Backdrop open={openLoadingSpinner} className={classes.backdrop}>
        <CircularProgress />
      </Backdrop>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          square
          eleviation={0}
        >
          <div className={classes.paper}>
            <Typography
              component="h1"
              variant="h4"
              className={classes.logo}
              aria-label="tweetoo dot x y z"
            >
              Tweetoo.xyz
            </Typography>
            <Typography component="h2" variant="h6">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSignin}>
              <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={userData.email}
                autoComplete="email"
                autoFocus
                onChange={e =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={userData.password}
                autoComplete="current-password"
                onChange={e =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="secondary"
                    onChange={e =>
                      setUserData({ ...userData, persist: e.target.checked })
                    }
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                size="large"
                disableElevation
              >
                Log in
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => setOpenSignUpDialog(true)}
                disableElevation
              >
                Sign up
              </Button>
              <SignupForm
                open={openSignUpDialog}
                handleCloseDialog={handleCloseDialog}
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="secondary">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
