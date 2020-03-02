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
import './App.css';
// Pages
import AuthPage from './auth/AuthPage';
import Home from './home/Home';

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
            <Home path="/home" />
            <Home path="/trending" />
          </Router>
        </ErrorCatcher>
      </ThemeProvider>
    );
  }
}

export default App;
