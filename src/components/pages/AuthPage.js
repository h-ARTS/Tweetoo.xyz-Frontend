import React, { Component } from 'react';
import { Container, Grid, Button, Paper } from '@material-ui/core';
import SignupForm from './auth-page/SignupForm';
import LoginForm from './auth-page/LoginForm';
export class AuthPage extends Component {
  state = {
    is_authenticated: false,
    newUser: false
  };

  componentDidMount() {
    if (this.state.is_authenticated) {
      window.location.href = '/home';
    }
  }

  render() {
    const { newUser } = this.state;
    return (
      <Container maxWidth component="main">
        <Grid xs={false} sm={7} />
        <Grid xs={false} sm={5} component={Paper}>
          <form>
            {newUser ? <SignupForm /> : <LoginForm />}
            <Button type="submit" fullWidth variant="contained">
              {newUser ? 'Signup' : 'Login'}
            </Button>
          </form>
        </Grid>
      </Container>
    );
  }
}

export default AuthPage;
