import React, { Component } from 'react';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import { Router } from '@reach/router';
// JWT / Axios
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// Component
import ErrorCatcher from '../common/utils/ErrorCatcher';
// Styling
import theme from '../common/utils/theme';
// Pages
import AuthPage from './auth/AuthPage';
import Home from './home/Home';
import Profile from './profile/Profile';
import Trending from './trending/Trending';
import Layout from '../common/ui/Layout';

axios.defaults.baseURL = 'http://localhost:3000/api';
const token = localStorage.token;
if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    window.location.href = '/';
  } else {
    axios.defaults.headers['Authorization'] = token;
  }
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ErrorCatcher>
          <Router>
            <AuthPage path="/" />
          </Router>
          <Router component={Layout}>
            <Home path="home" />
            <Trending path="trending" />
            <Profile path=":userId/*" />
          </Router>
        </ErrorCatcher>
      </ThemeProvider>
    );
  }
}

export default App;
